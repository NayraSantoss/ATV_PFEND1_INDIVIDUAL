const nomesObrigatorios = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];

export function carregarAmbiente(arquivoDeConfiguracao) {
    if (arquivoDeConfiguracao) {
        try {
            process.loadEnvFile(arquivoDeConfiguracao);
        } catch {
            throw new Error(`Arquivo de configuração: ${arquivoDeConfiguracao}`);
        }
    }
    const ausentes = nomesObrigatorios.filter((nome) => {
        const valor = process.env[nome];
        return typeof valor !== 'string' || valor.trim() === '';
    });
    if (ausentes.length > 0) {
        throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
    }
    return {
        porta: process.env.PORT,
        ambiente: process.env.NODE_ENV || 'development'
    }
}

export function exibirDiagnostico(configuracao) {
    console.table({
        projeto: 'api-aroma-importados',
        node: process.version,
        sistema: `${process.platform} ${process.arch}`,
        diretorio: process.cwd(),
        portaConfigurada: configuracao.porta
    })
}
