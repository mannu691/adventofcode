export async function part1() {
    const str = await Deno.readTextFile("input.txt");
    let memo = {};

    function blink(num, i = 25) {
        if (!memo[num]) memo[num] = [];
        if (memo[num][i]) return memo[num][i];
        if (i == 0) { return 1; }
        i--;
        let len = 0;
        const strLen = num.toString().length;
        if (num == 0) len += blink(1, i);
        else if (strLen % 2 == 0) {
            let mul = (Math.pow(10, (strLen / 2)));
            len += blink(Math.floor(num / mul), i)
            len += blink(Math.floor(num % mul), i)
        } else {
            len += blink(num * 2024, i);
        }
        memo[num][i + 1] = len;
        return len;
    }

    let count = 0
    str.split(" ").forEach((v) => count += blink(Number(v), 25))
    return count
}