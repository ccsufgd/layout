
const processos = [
    {
        titulo: 'VESTIBULAR 2025/UFGD',
        descricao: 'Processo Seletivo Vestibular UFGD 2025',
        periodo: '15/07/2024 a 13/09/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/processo-seletivo-vestibular-psv/psv-2025'
    },
    {
        titulo: 'VESTIBULAR LEDUC 2025/UFGD',
        descricao: 'Processo Seletivo do Curso de Licenciatura em Educação do Campo 2025',
        periodo: '15/07/2024 a 13/09/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/licenciatura-em-educacao-do-campo-psleduc/psleduc-2025'
    },
    {
        titulo: 'VESTIBULAR LETRAS-LIBRAS LicEaD 2025/UFGD',
        descricao: 'Processo Seletivo Vestibular Letras Libras Licenciatura 2025 da UFGD',
        periodo: '15/07/2024 a 13/09/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/processo-seletivo-vestibular-psv/psv-2025'
    },
    {
        titulo: 'PSPVO-2024.2/UFGD',
        descricao: 'Processo Seletivo para Preenchimento de Vagas Ociosas por Transferência Voluntária e para Portadores de Diploma da UFGD',
        periodo: '15/07/2024 a 24/07/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/pspvo/pspvo-2024-2'
    },
    {
        titulo: 'PSAH-2024.2/UFGD',
        descricao: 'Processo Seletivo destinado a refugiados, asilados políticos, apátridas, portadores de visto temporário de acolhida de residência para fins de acolhida humanitária, portadores de autorização',
        periodo: '15/07/2024 a 24/07/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/psah/psah-2024-2'
    },
	{
        titulo: 'PSPE-2024/UFGD',
        descricao: 'Processo Seletivo para Vagas de Estágio para Atuação no Núcleo Multidisciplinar para a Inclusão e Acessibilidade - NUMIAC',
        periodo: '17/07/2024 a 31/07/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/pro-estagio/pspe-2024'
    },
    {
        titulo: 'PSIN-2025/UFGD',
        descricao: 'Processo Seletivo Licenciatura Intercultural Indígena - Teko Arandu e em Pedagogia Intercultural Indígena',
        periodo: '01/08/2024 a 23/08/2024',
        url: 'https://portal.ufgd.edu.br/vestibular/licenciatura-indigena-teko-arandu/psin-2025'
    } 
];

function ajustarParaMST(date) {
    const offset = -4 * 60 * 60 * 1000; // GMT-4
    return new Date(date.getTime() + offset);
}

function gerarTabela() {
    const tbodyAbertos = document.createElement('tbody');
    const hoje = ajustarParaMST(new Date());
    
    processos.forEach(processo => {
        const [inicioStr, fimStr] = processo.periodo.split(' a ');
        const [diaIni, mesIni, anoIni] = inicioStr.split('/');
        const [diaFim, mesFim, anoFim] = fimStr.split('/');

        // Ajusta o horário do início e fim
        const inicio = ajustarParaMST(new Date(`${anoIni}-${mesIni}-${diaIni}T00:00:00`));
        const fim = ajustarParaMST(new Date(`${anoFim}-${mesFim}-${diaFim}T23:59:59`));

        if (hoje >= inicio && hoje <= fim) {
            const tr = document.createElement('tr');
            tr.dataset.url = processo.url;
            tr.innerHTML = `
                <td>${processo.titulo} - ${processo.descricao}</td>
                <td class="text-center">${processo.periodo}</td>
            `;
            // Adiciona estilo diretamente no JavaScript
            tr.querySelector('td.text-center').style.whiteSpace = window.innerWidth > 767 ? 'nowrap' : 'normal';
            tbodyAbertos.appendChild(tr);
        }
    });

    if (tbodyAbertos.children.length > 0) {
        const table = document.createElement('table');
        table.className = 'table table-sm table-bordered table-striped table-hover table-custom compact-table';
        table.style.borderRadius = '10px'; 
        table.style.overflow = 'hidden';
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="fw-bold">Processos Seletivos com Inscrições Abertas</th>
                    <th class="fw-bold text-center">Período de Inscrição</th>
                </tr>
            </thead>
        `;
        table.appendChild(tbodyAbertos);

        const divCentroSelecao = document.getElementById('centroselecao');
        divCentroSelecao.insertAdjacentElement('afterend', table);
    }
}

gerarTabela();

document.addEventListener('click', (event) => {
    const target = event.target.closest('tr');
    if (target && target.dataset.url) {
        window.location.href = target.dataset.url;
    }
});

// Adiciona listener para ajustar o white-space ao redimensionar a janela
window.addEventListener('resize', () => {
    document.querySelectorAll('td.text-center').forEach(td => {
        td.style.whiteSpace = window.innerWidth > 767 ? 'nowrap' : 'normal';
    });
});

