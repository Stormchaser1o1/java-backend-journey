/**
 * Day 012 debugging exercise, solved.
 *
 * Four bugs: one compile error, three that compiled fine — and one of those
 * three hung the program forever.
 *
 *   1. i < 10            -> off-by-one, summed 1..9 and gave 45 instead of 55
 *   2. no n--            -> the condition never changed: INFINITE LOOP
 *   3. stray semicolon   -> `for (...);` is a legal loop with an EMPTY body, so
 *                           the block below ran once on its own, and `i` was out
 *                           of scope there: "cannot find symbol"
 *   4. continue not break-> kept scanning and overwrote `found` with the LAST
 *                           multiple of 7 (98) rather than stopping at the first
 *
 * Note the ordering luck: bug 3 was a compile error, so the program could not
 * run at all until it was fixed — which meant bug 2's infinite loop could not
 * bite until the file compiled.
 */
public class Stats {
    public static void main(String[] args) {

        // BUG 1: `i < 10` stops at 9. Starting at 1 pairs with `<=`.
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("sum = " + sum);

        // BUG 2: a while loop whose condition never changes never ends.
        // The update is the programmer's job here — unlike a for, where the
        // header will not let you forget it.
        int n = 3;
        while (n > 0) {
            System.out.println("tick " + n);
            n--;
        }

        // BUG 3: `for (int i = 1; i <= 10; i++);` — that semicolon was the
        // entire loop body. Removing it attaches the block, which also brings
        // `i` back into scope.
        int evens = 0;
        for (int i = 1; i <= 10; i++)
        {
            if (i % 2 == 0) evens++;
        }
        System.out.println("evens = " + evens);

        // BUG 4: `continue` skips to the next iteration and keeps going, so the
        // last match wins. `break` leaves the loop, so the FIRST match wins.
        int found = 0;
        for (int i = 21; i <= 100; i++) {
            if (i % 7 == 0) {
                found = i;
                break;
            }
        }
        System.out.println("found = " + found);
    }
}
