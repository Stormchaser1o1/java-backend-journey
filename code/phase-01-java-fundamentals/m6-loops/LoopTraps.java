/**
 * The five ways loops go wrong. Each one is shown running, with a guard so the
 * infinite ones terminate instead of hanging this program.
 */
public class LoopTraps {
    public static void main(String[] args) {

        System.out.println("=== 1. Forgetting to update the variable = infinite loop ===");
        int i = 1;
        int guard = 0;
        while (i <= 5) {
            System.out.print(i + " ");
            // i++;  <- MISSING. i stays 1 forever.
            if (++guard == 8) { System.out.print("... (stopped by a guard)"); break; }
        }
        System.out.println("\nA `while` whose condition never changes never ends.\n");

        System.out.println("=== 2. The stray semicolon ===");
        int count = 0;
        for (int n = 0; n < 5; n++);      // <- semicolon ENDS the loop here
        {
            count++;                       // this block runs ONCE, on its own
        }
        System.out.println("count after `for (...);` + block = " + count
                + "   <- 1, not 5");
        System.out.println("`for (...);` is a complete loop with an EMPTY body.\n");

        System.out.println("=== 3. Comparing doubles in a loop condition ===");
        int steps = 0;
        for (double d = 0.0; d != 1.0; d += 0.1) {
            steps++;
            if (steps > 15) { System.out.print("never reached exactly 1.0 - "); break; }
        }
        System.out.println("stopped after " + steps + " steps");
        double sum = 0.0;
        for (int n = 0; n < 10; n++) sum += 0.1;
        System.out.println("0.1 added ten times = " + sum + "  <- not exactly 1.0");
        System.out.println("Loop counters should be int. Never use != on doubles.\n");

        System.out.println("=== 4. Modifying the counter inside the body ===");
        System.out.print("i incremented in BOTH places: ");
        for (int n = 0; n < 10; n++) {
            System.out.print(n + " ");
            n++;                            // skips every other value
        }
        System.out.println("\nThe update clause is not the only thing that can move n.\n");

        System.out.println("=== 5. break only leaves the INNERMOST loop ===");
        System.out.println("plain break:");
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                if (col == 2) break;        // leaves the col loop only
                System.out.println("   row " + row + ", col " + col);
            }
        }
        System.out.println("The outer loop kept going all 3 times.\n");

        System.out.println("labelled break:");
        outer:
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                if (col == 2) break outer;  // leaves BOTH loops
                System.out.println("   row " + row + ", col " + col);
            }
        }
        System.out.println("A label lets one break escape every enclosing loop.");
    }
}
