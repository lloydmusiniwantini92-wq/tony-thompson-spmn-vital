self.onmessage = (e) => {
    const { type, payload } = e.data;

    switch (type) {
        case "init":
            self.grid = Array(20).fill(0).map(() => Array(10).fill(0));
            self.score = 0;
            postMessage({ type: "updateGrid", payload: self.grid });
            postMessage({ type: "updateScore", payload: self.score });
            break;

        case "move":
            if (payload === "ArrowDown") self.score += 10;
            if (payload === "ArrowUp") self.score = Math.max(0, self.score - 5);
            postMessage({ type: "updateScore", payload: self.score });
            break;

        case "reset":
            self.grid = Array(20).fill(0).map(() => Array(10).fill(0));
            self.score = 0;
            postMessage({ type: "updateGrid", payload: self.grid });
            postMessage({ type: "updateScore", payload: self.score });
            break;
    }
};
