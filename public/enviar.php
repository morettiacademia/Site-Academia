<?php
/**
 * Recebe os formulários do site (Contato e Lista de espera) e envia por e-mail.
 * Roda na hospedagem da GoDaddy (PHP). Cada envio também é guardado numa planilha
 * CSV fora da pasta pública, como cópia de segurança.
 */

// ===== Configuração =====
$DESTINO   = 'diretoria@academiadamagia.com.br';        // quem recebe os formulários
$REMETENTE = 'site@academiadamagia.com.br';             // precisa ser do próprio domínio
$PASTA_CSV = dirname(__DIR__) . '/formularios-site';     // fora do public_html
// ========================

date_default_timezone_set('America/Sao_Paulo');
header('X-Robots-Tag: noindex');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contato', true, 303);
    exit;
}

function campo($nome, $max = 2000) {
    $v = isset($_POST[$nome]) ? trim((string) $_POST[$nome]) : '';
    $v = str_replace("\0", '', $v);
    return mb_substr($v, 0, $max);
}
function linha($v) { return preg_replace('/[\r\n]+/', ' ', $v); } // evita injeção de cabeçalho
function celula($v) { return preg_match('/^[=+\-@]/', $v) ? "'" . $v : $v; } // evita fórmulas na planilha

// Robôs preenchem o campo escondido "empresa": finge sucesso e descarta.
if (campo('empresa') !== '') {
    header('Location: /obrigado', true, 303);
    exit;
}

$tipo  = campo('form-name', 40) === 'contato' ? 'contato' : 'lista-de-espera';
$nome  = linha(campo('nome', 120));
$email = linha(campo('email', 160));
$wa    = linha(campo('whatsapp', 40));
$ok    = $nome !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) && campo('consentimento', 5) === 'sim';

$voltar = $tipo === 'contato' ? '/contato' : '/' . preg_replace('/[^a-z0-9-]/', '', campo('programa', 60));
if (!$ok) {
    header('Location: ' . $voltar . '?erro=1', true, 303);
    exit;
}

$dados = [
    'Data'        => date('d/m/Y H:i'),
    'Formulário'  => $tipo === 'contato' ? 'Contato' : 'Lista de espera',
    'Programa'    => linha(campo('programa', 60)),
    'Nome'        => $nome,
    'E-mail'      => $email,
    'WhatsApp'    => $wa,
    'Momento'     => linha(campo('momento', 120)),
    'Mensagem'    => campo('mensagem', 4000),
    'Página'      => linha(campo('pagina', 200)),
];

// Cópia de segurança em CSV (ignora se a pasta não puder ser criada)
if (is_dir($PASTA_CSV) || @mkdir($PASTA_CSV, 0750, true)) {
    $arq = $PASTA_CSV . '/' . $tipo . '.csv';
    $novo = !file_exists($arq);
    if ($fp = @fopen($arq, 'a')) {
        if ($novo) fputcsv($fp, array_keys($dados), ';');
        fputcsv($fp, array_map('celula', array_values($dados)), ';');
        fclose($fp);
    }
}

$assunto = $tipo === 'contato'
    ? 'Site: nova mensagem de ' . $nome
    : 'Site: lista de espera — ' . ($dados['Programa'] ?: 'programa') . ' — ' . $nome;
$corpo = '';
foreach ($dados as $k => $v) {
    if ($v !== '') $corpo .= $k . ': ' . $v . "\n";
}
$cabecalhos = implode("\r\n", [
    'From: Site Academia da Magia <' . $REMETENTE . '>',
    'Reply-To: ' . mb_encode_mimeheader($nome, 'UTF-8') . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
]);
@mail($DESTINO, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $corpo, $cabecalhos, '-f' . $REMETENTE);

header('Location: /obrigado', true, 303);
exit;
