const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLc_pJrEPYm3fA5hhn-QpvwVuVrC5XuffNR-ZuTqcm5PkjPlFDqrfM6zxgXPeoeFS-A6y2-LBvkkqD/pub?output=csv";

async function carregarCarteira() {
  const response = await fetch(sheetURL);
  const texto = await response.text();

  const linhas = texto.split("\n").slice(1);
  const tabela = document.getElementById("tabela-carteira");

  tabela.innerHTML = "";

  linhas.forEach(linha => {
    const colunas = linha.split(",");

    if (colunas.length >= 4) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${colunas[0]}</td>
        <td>${colunas[1]}</td>
        <td>${colunas[2]}%</td>
        <td>${colunas[3]}%</td>
      `;
      tabela.appendChild(tr);
    }
  });
}

carregarCarteira();

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ2gqmGDFY0BpfAhRw9ujpuiNurpnDk9axfjTyw0EJLmLNSbKQuWk9ANOv6KtzOLT9vbNY0RkyheC2/pub?output=csv")
  .then(res => res.text())
  .then(csv => {
    const [carteira, benchmark] = csv.trim().split("\n")[1].split(",");

    document.getElementById("ret-carteira").textContent = `${carteira}%`;
    document.getElementById("ret-benchmark").textContent = `${benchmark}%`;

    const excesso = (carteira - benchmark).toFixed(1);
    const el = document.getElementById("ret-excesso");

    el.textContent = `${excesso}%`;
    el.style.color = excesso >= 0 ? "green" : "red";
  });
