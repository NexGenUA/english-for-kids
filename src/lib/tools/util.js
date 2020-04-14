const util = {
  delay(ms) {
    return new Promise((res, rej) => {
      setTimeout(() => res(), ms)
    })
  },
};

export { util };
