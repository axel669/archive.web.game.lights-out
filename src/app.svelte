<script context="module">
    const handler = (func) =>
        (...args) =>
            (evt) => func(evt, ...args)
</script>

<script>
    import {
        AppStyle,
        Baseline as baseline,
        TronTheme as theme,

        Screen,
        Appbar,

        Button,
        Flex,
        Paper,
    } from "svelte-doric"

    let board = []
    let celebrate = false
    let poggies = null
    const toggle = (x, y) => {
        if (x < 0 || y < 0 || x > 4 || y > 4) {
            return
        }

        const next = [...board]
        next[y * 5 + x] = 1 - next[y * 5 + x]
        board = next
    }
    const clicked = handler(
        (evt, index) => {
            const x = index % 5
            const y = Math.floor(index / 5)
            toggle(x, y)
            toggle(x - 1, y)
            toggle(x + 1, y)
            toggle(x, y - 1)
            toggle(x, y + 1)

            if (board.includes(1) === true) {
                return
            }
            poggers()
        }
    )
    const poggers = () => {
        celebrate = true
        board = []
        poggies = setTimeout(
            () => celebrate = false,
            2500
        )
    }

    const newGame = handler(
        () => {
            celebrate = false
            clearTimeout(poggies)
            board = Array.from(
                { length: 25 },
                () => 0
            )
            const plays = []
            while (plays.length < 25) {
                const i = Math.floor(
                    Math.random() * 25
                )
                const a = plays[plays.length - 2]
                const b = plays[plays.length - 1]
                const args = (i === a || i === b) ? [] : [i]
                plays.push(...args)
            }
            requestAnimationFrame(
                () => {
                    for (const play of plays) {
                        clicked(play)()
                    }
                }
            )
        }
    )
</script>

<style>
    game-board {
        position: relative;
        display: block;
        width: min(500px, 100%);
        border: 1px solid var(--primary);
    }
    game-board::after {
        display: block;
        content: "";
        margin-top: 100%;
        width: 100%;
    }

    game-light {
        position: absolute;
        top: calc(var(--y) * 20%);
        left: calc(var(--x) * 20%);
        width: 20%;
        height: 20%;
    }
    game-light::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        right: 2px;
        bottom: 2px;
        border: 1px solid var(--primary);
        border-radius: 4px;

        --intensity: 175;
        background-color: rgb(
            calc(var(--intensity) * var(--on)),
            calc(var(--intensity) * var(--on)),
            0
        );
        transition: background-color linear 250ms;
    }

    img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: none;
    }
    img.celebrate {
        display: block;
    }
</style>

<AppStyle {baseline} {theme} />

<Screen>
    <Appbar slot="title">
        Lights Out

        <Button on:click={newGame()} adorn slot="action">
            New Game
        </Button>
    </Appbar>

    <Paper>
        <Flex center>
            <game-board>
                {#each board as light, index (index)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <game-light
                        style="--x: {index % 5}; --y: {Math.floor(index / 5)}; --on: {light};"
                        on:click={clicked(index)}
                    />
                {/each}
                <img
                    src="https://media3.giphy.com/media/5jT0jaNDsM6Ik7X9yq/giphy.gif?cid=ecf05e47x813zzlm8zwui8jv1rqh10ijl0cxatdb88sh9faq&rid=giphy.gif&ct=g"
                    alt="confetti"
                    class:celebrate
                />
            </game-board>
        </Flex>
    </Paper>
</Screen>
