class RateLimiter {
    constructor(maxRequests, interval) {
      this.maxRequests = maxRequests;
      this.interval = interval;
      this.tokens = maxRequests;
      this.lastRefill = Date.now();
    }
  
    refillTokens() {
      const now = Date.now();
      const elapsed = now - this.lastRefill;
      if (elapsed > this.interval) {
        this.tokens = this.maxRequests;
        this.lastRefill = now;
      }
    }
  
    tryRemoveToken() {
      this.refillTokens();
      if (this.tokens > 0) {
        this.tokens--;
        return true;
      }
      return false;
    }
  }
  
  export default RateLimiter;