
Bun.serve({
    fetch(req) {
        return new Response("Hello")
    },
})

console.log("server running");