/**
 * for, while and do-while — the same machine wearing three sets of clothes.
 */
public class Looping {
    public static void main(String[] args) {

        System.out.println("=== 1. The same loop, three ways ===");
        System.out.print("for       : ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }

        System.out.print("\nwhile     : ");
        int j = 1;
        while (j <= 5) {
            System.out.print(j + " ");
            j++;
        }

        System.out.print("\ndo-while  : ");
        int k = 1;
        do {
            System.out.print(k + " ");
            k++;
        } while (k <= 5);
        System.out.println("\nIdentical output. `for` just puts all three parts on one line.\n");

        System.out.println("=== 2. The one real difference: a condition false from the start ===");
        System.out.print("while (false)    runs: ");
        int n = 10;
        while (n < 5) { System.out.print("body "); n++; }
        System.out.println("(nothing)");

        System.out.print("do-while (false) runs: ");
        int m = 10;
        do { System.out.print("body "); m++; } while (m < 5);
        System.out.println("<- ONCE, because the check happens at the BOTTOM\n");

        System.out.println("=== 3. Off-by-one: < vs <= ===");
        System.out.print("i < 5  gives : ");
        for (int i = 0; i < 5; i++) System.out.print(i + " ");
        System.out.print("  (5 numbers, 0..4)");
        System.out.print("\ni <= 5 gives : ");
        for (int i = 0; i <= 5; i++) System.out.print(i + " ");
        System.out.println("  (6 numbers, 0..5)");
        System.out.println("Same loop, one character apart, different number of iterations.\n");

        System.out.println("=== 4. Counting down, and stepping by more than one ===");
        System.out.print("countdown : ");
        for (int i = 5; i > 0; i--) System.out.print(i + " ");
        System.out.print("\nevens     : ");
        for (int i = 0; i <= 10; i += 2) System.out.print(i + " ");
        System.out.println("\n");

        System.out.println("=== 5. break and continue ===");
        System.out.print("break at 4    : ");
        for (int i = 1; i <= 8; i++) {
            if (i == 4) break;          // leave the loop entirely
            System.out.print(i + " ");
        }
        System.out.print("\ncontinue on 4 : ");
        for (int i = 1; i <= 8; i++) {
            if (i == 4) continue;       // skip THIS iteration, keep looping
            System.out.print(i + " ");
        }
        System.out.println("\n");

        System.out.println("=== 6. The loop variable's scope ===");
        for (int i = 0; i < 3; i++) { /* i lives only in here */ }
        // System.out.println(i);       // won't compile: cannot find symbol
        int outside = 0;
        while (outside < 3) { outside++; }
        System.out.println("after the while loop, outside = " + outside
                + "   <- declared outside, so it survives");
        System.out.println("A `for` variable dies with the loop. That is usually what you want.\n");

        System.out.println("=== 7. Nested loops: a multiplication table ===");
        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 5; col++) {
                System.out.printf("%3d", row * col);
            }
            System.out.println();
        }
        System.out.println("The inner loop runs completely for EACH step of the outer one.");
        System.out.println("3 rows x 5 cols = 15 iterations of the inner body.");
    }
}
