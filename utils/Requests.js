class Requests {
  #totalsucces;
  #totalfail;
  #id;
  #begintime;
  constructor() {
    this.#totalsucces = 0;
    this.#totalfail = 0;
    this.#begintime = Date.now();
    this.#id = Math.floor(Math.random() * 10000000);
  }

  set succesRequest(amount) {
    if (!amount) return;
    if (amount < 1 || amount > 10) return;
    this.#totalsucces += amount;
  }

  set failRequest(amount) {
    if (!amount) return;
    if (amount < 1 || amount > 10) return;
    this.#totalfail += amount;
  }

  get requests() {
    return {
      succes: this.#totalsucces,
      failed: this.#totalfail,
    };
  }

  get instance() {
    return {
      id: this.#id,
      uptime: `${new Date(Date.now() - this.#begintime).getSeconds()} sec`,
    };
  }

  values() {
    return {
      succes: this.#totalsucces,
      failed: this.#totalfail,
      id: this.#id,
      uptime: `${new Date(Date.now() - this.#begintime).getSeconds()} sec`,
      string: this.toString(),
    };
  }
  toString() {
    return `The instace: ${this.#id} has ${
      this.#totalsucces
    } succesfull requests and ${
      this.#totalfail
    } failed requests with an uptime of ${new Date(
      Date.now() - this.#begintime
    ).getSeconds()} seconds`;
  }
}

module.exports = new Requests();
