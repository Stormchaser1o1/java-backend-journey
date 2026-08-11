/**
 * Relational, logical and bitwise operators.
 * The bitwise section operates directly on the bit patterns from Day 002.
 */
public class LogicAndBits {

    /** Returns true and announces itself, so we can SEE whether it was called. */
    static boolean loud(String label, boolean value) {
        System.out.println("      (evaluated " + label + ")");
        return value;
    }

    public static void main(String[] args) {

        System.out.println("=== 1. Relational operators produce a boolean ===");
        int a = 7, b = 5;
        System.out.println("a > b   = " + (a > b));
        System.out.println("a == b  = " + (a == b) + "   <- TWO equals signs. One would assign.");
        System.out.println("a != b  = " + (a != b) + "\n");

        System.out.println("=== 2. Short-circuiting: && and || can SKIP the right side ===");
        System.out.println("false && loud(...)  ->");
        boolean r1 = false && loud("right side of &&", true);
        System.out.println("   result " + r1 + "  <- right side never printed: it was SKIPPED\n");

        System.out.println("true || loud(...)   ->");
        boolean r2 = true || loud("right side of ||", true);
        System.out.println("   result " + r2 + "  <- skipped again\n");

        System.out.println("false & loud(...)   ->   (single & does NOT short-circuit)");
        boolean r3 = false & loud("right side of &", true);
        System.out.println("   result " + r3 + "  <- it DID run\n");

        System.out.println("=== 3. Why short-circuiting matters: null-safety ===");
        String s = null;
        if (s != null && s.length() > 0) {
            System.out.println("not reached");
        }
        System.out.println("s != null && s.length() > 0  ->  safe, no crash");
        System.out.println("Swap to `&` and this throws NullPointerException.\n");

        System.out.println("=== 4. Bitwise operators: Day 002, live ===");
        int x = 12;   // 1100
        int y = 10;   // 1010
        show("x       ", x);
        show("y       ", y);
        show("x & y   ", x & y);
        show("x | y   ", x | y);
        show("x ^ y   ", x ^ y);
        show("~x      ", ~x);
        System.out.println();

        System.out.println("=== 5. Shifts are multiply/divide by powers of two ===");
        show("5       ", 5);
        show("5 << 1  ", 5 << 1);
        show("5 << 3  ", 5 << 3);
        show("40 >> 2 ", 40 >> 2);
        System.out.println();
        System.out.println("On NEGATIVE numbers, >> and >>> differ:");
        show("-8      ", -8);
        show("-8 >> 1 ", -8 >> 1);
        show("-8 >>> 1", -8 >>> 1);
        System.out.println("  >>  keeps the sign bit (arithmetic shift)");
        System.out.println("  >>> forces zeros in from the left (logical shift)\n");

        System.out.println("=== 6. Compound assignment hides a cast ===");
        byte small = 10;
        // small = small + 300;   // <- would NOT compile: int cannot be assigned to byte
        small += 300;             // compiles! += silently casts back to byte
        System.out.println("byte small = 10; small += 300;  ->  " + small
                + "   <- silently wrong, not 310");
        System.out.println("`a += b` is really `a = (type of a)(a + b)`.");
    }

    /** Prints a value in decimal and as 8-bit-grouped binary. */
    static void show(String label, int v) {
        String bits = String.format("%32s", Integer.toBinaryString(v)).replace(' ', '0');
        String grouped = bits.substring(0, 8) + " " + bits.substring(8, 16) + " "
                + bits.substring(16, 24) + " " + bits.substring(24);
        System.out.printf("%-9s = %12d   %s%n", label, v, grouped);
    }
}
