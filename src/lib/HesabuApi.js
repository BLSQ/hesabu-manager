const HESABU_URL = process.env.REACT_APP_HESABU_URL;
const HESABU_TOKEN = process.env.REACT_APP_HESABU_TOKEN;

const HEADERS = {
  "content-type": "application/json",
  "X-token": HESABU_TOKEN,
};

class HesabuApi {
  constructor() {
    this.url = HESABU_URL;
    this.token = HESABU_TOKEN;
  }
}
