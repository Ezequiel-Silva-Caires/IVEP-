fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRoDNxIZcR2-Q-wO8QQzZ8YIsZnK0y5BUcNExTOOF16xEA7A5E23lQEyE4k0Q5dmLlTSPgsdIiPtJPB/pub?output=csv")
  .then(res => res.text())
  .then(csv => {
    const linhas = csv.trim().split("\n").slice(1);
    const tbody = document.querySelector("#tabela-relatorios tbody");

    tbody.innerHTML = "";

    linhas.forEach(linha => {
      const cols = linha.replace(/"/g, "").split(",");
      const mes = cols[0];
      const ano = cols[1];
      const pdf = cols.slice(2).join(",");

      if (pdf) {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${mes}</td>
          <td>${ano}</td>
          <td>
            <a href="${pdf.trim()}" target="_blank" class="btn-pdf">
              Ver Relatório
            </a>
          </td>
        `;

        tbody.appendChild(tr);
      }
    });
  })
  .catch(err => {
    console.error("Erro ao carregar relatórios:", err);
  });
