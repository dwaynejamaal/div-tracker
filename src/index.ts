class Investment {
  ticker: string;
  divYield: number;
  purchasePrice: number;
  quantity: number;
  purchaseDate: Date;

  constructor(ticker: string, divYield: number, purchasePrice: number, quantity: number, purchaseDate: Date) {
    this.ticker = ticker;
    this.divYield = divYield;
    this.purchasePrice = purchasePrice;
    this.quantity = quantity;
    this.purchaseDate = purchaseDate;
  }
}

const form = document.getElementById(`add-form`) as HTMLFormElement | null;
const port = document.getElementById(`portfolio`) as HTMLDivElement | null;

function createCard(investment: Investment) {
  const inv = document.createElement(`div`);
  inv.classList.add(`card`);
  inv.innerHTML = `
    <h3>${investment.ticker}</h3>
    <p>Purchase Price: $${investment.purchasePrice.toFixed(2)}</p>
    <p>Yield: ${investment.divYield.toFixed(2)}%</p>
    <p>Quantity: ${investment.quantity}</p>
    <p>Purchase Date: ${investment.purchaseDate.toLocaleDateString()}</p>
  `;
  return inv;
}

if (form && port) {
  form.addEventListener(`submit`, (e) => {
    e.preventDefault(); // Prevent default behavior of form submission
    const data = new FormData(form);
    const ticker = (data.get(`ticker`) || ``).toString().trim();
    const divYield = Number(data.get(`div-yield`) || 0);
    const purchasePrice = parseFloat(data.get(`purchase-price`)?.toString() || '0');
    const quantity = Number(data.get(`quantity`) || 0);
    const purchaseDate = new Date(data.get(`purchase-date`) as string);

    if (!ticker || divYield <= 0 || purchasePrice <= 0 || quantity <= 0 || isNaN(purchaseDate.getTime())) {
      alert(`Please enter valid investment details.`);
      return;
    }

    const investment = new Investment(ticker, divYield, purchasePrice, quantity, purchaseDate);
    const card = createCard(investment);
    port.appendChild(card);
    form.reset();
  });
}