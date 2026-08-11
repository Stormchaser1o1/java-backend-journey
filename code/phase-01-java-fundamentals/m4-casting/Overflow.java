/**
 * Making overflow visible, and making it fail loudly instead of silently.
 */
public class Overflow {
    public static void main(String[] args) {

        System.out.println("=== 1. Silent wraparound, one step at a time ===");
        int max = Integer.MAX_VALUE;
        System.out.println("MAX     = " + max + "   " + bits(max));
        System.out.println("MAX + 1 = " + (max + 1) + "  " + bits(max + 1));
        System.out.println("The carry lands in the SIGN BIT. No exception.\n");

        System.out.println("=== 2. Where it actually bites: real quantities ===");
        int msPerDay = 86_400_000;
        System.out.println("milliseconds in a day  = " + msPerDay + "  (fits in int)");
        System.out.println("days until int overflow= " + (Integer.MAX_VALUE / msPerDay) + "  <- only 24 days!");
        System.out.println("as int : 30 days in ms = " + (30 * msPerDay) + "   <- WRONG, negative");
        System.out.println("as long: 30 days in ms = " + (30L * msPerDay) + "    <- correct\n");

        System.out.println("=== 3. The fix is always the SAME shape ===");
        System.out.println("(long)(2000000000 + 2000000000) = " + (long) (2000000000 + 2000000000)
                + "   <- too late, already wrapped");
        System.out.println("2000000000L + 2000000000        = " + (2000000000L + 2000000000)
                + "   <- widen an OPERAND first");
        System.out.println("Cast an operand, never the result. Same rule as (double) a / b.\n");

        System.out.println("=== 4. Make it fail loudly: Math.*Exact ===");
        System.out.println("Integer.MAX_VALUE + 1        = " + (Integer.MAX_VALUE + 1) + "   (silent)");
        try {
            Math.addExact(Integer.MAX_VALUE, 1);
        } catch (ArithmeticException e) {
            System.out.println("Math.addExact(MAX, 1)        -> " + e + "   (loud)");
        }
        try {
            Math.multiplyExact(100_000, 100_000);
        } catch (ArithmeticException e) {
            System.out.println("Math.multiplyExact(1e5, 1e5) -> " + e);
        }
        try {
            Math.toIntExact(3_000_000_000L);
        } catch (ArithmeticException e) {
            System.out.println("Math.toIntExact(3000000000L) -> " + e + "\n");
        }

        System.out.println("=== 5. The overflow that hides inside a NEGATION ===");
        System.out.println("MIN / -1 = " + (Integer.MIN_VALUE / -1) + "   <- no exception, it wrapped");
        System.out.println("MIN_VALUE / -1 should be 2147483648, which no int can hold.");
        System.out.println("Result: " + (Integer.MIN_VALUE / -1) + "  <- it wraps to MIN_VALUE itself.");
        System.out.println("Math.negateExact(MIN_VALUE) is the safe way to spot it.");
    }

    static String bits(int v) {
        String b = String.format("%32s", Integer.toBinaryString(v)).replace(' ', '0');
        return b.substring(0, 8) + " " + b.substring(8, 16) + " "
             + b.substring(16, 24) + " " + b.substring(24);
    }
}
