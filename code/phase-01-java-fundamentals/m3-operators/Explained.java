/**
 * The three Module 3 results that are impossible to believe until you watch them:
 *
 *   A. why `&` throws a NullPointerException where `&&` does not
 *   B. why (low + high) / 2 is a real binary-search bug, and >>> 1 is the fix
 *   C. why `byte small = 10; small += 300;` leaves 54 behind
 *
 * Written for Day 009 after these three came back as "explain them again".
 * Every number below is printed by the JVM, not asserted in prose.
 */
public class Explained {

    /** Announces itself when called, so we can SEE whether Java bothered to evaluate it. */
    static boolean check(String label, boolean result) {
        System.out.println("      >>> Java RAN: " + label);
        return result;
    }

    public static void main(String[] args) {

        System.out.println("###### A. WHY  &  CRASHES AND  &&  DOES NOT ######\n");
        String name = null;

        System.out.println("--- with &&  (short-circuit) ---");
        try {
            if (check("name != null", name != null) && check("name.length() > 3", name.length() > 3)) {
                System.out.println("inside if");
            }
            System.out.println("   survived, no crash\n");
        } catch (NullPointerException e) {
            System.out.println("   NullPointerException!\n");
        }

        System.out.println("--- with &   (no short-circuit) ---");
        try {
            if (check("name != null", name != null) & check("name.length() > 3", name.length() > 3)) {
                System.out.println("inside if");
            }
            System.out.println("   survived, no crash\n");
        } catch (NullPointerException e) {
            System.out.println("   NullPointerException!\n");
        }
        System.out.println("Both evaluated the LEFT side first - Java is always left to right.");
        System.out.println("The difference is whether the RIGHT side runs at all.\n");

        System.out.println("###### B. BINARY SEARCH MIDPOINT OVERFLOW ######\n");
        int low  = 2_000_000_000;
        int high = 2_100_000_000;
        System.out.println("low            = " + low);
        System.out.println("high           = " + high);
        System.out.println("Integer.MAX    = " + Integer.MAX_VALUE);
        System.out.println("true low+high  = 4100000000   (too big for an int)");

        int sum = low + high;
        System.out.println("low + high     = " + sum + "   <- OVERFLOWED, went negative\n");
        System.out.println("(low+high) / 2   = " + (sum / 2)   + "   <- negative index -> crash");
        System.out.println("(low+high) >>> 1 = " + (sum >>> 1) + "   <- the true midpoint\n");
        System.out.println("bits sum      = " + pad(sum));
        System.out.println("bits sum >> 1 = " + pad(sum >> 1)  + "  = " + (sum >> 1));
        System.out.println("bits sum >>>1 = " + pad(sum >>> 1) + "  = " + (sum >>> 1));
        System.out.println("The bit pattern was always right; only the SIGN BIT made Java");
        System.out.println("read it as negative. >>> forces a 0 in and restores the reading.\n");

        System.out.println("###### C. WHY  +=  GIVES 54 ######\n");
        byte small = 10;
        System.out.println("byte small = 10;");
        System.out.println("small + 300 as an expression = " + (small + 300) + "   (an int)");
        small += 300;
        System.out.println("after  small += 300;   small = " + small);
        System.out.println("proof: (byte) 310 = " + (byte) 310);
        System.out.println("310 bits      = " + pad(310));
        System.out.println("lowest 8 bits = 00110110 = 54");
        System.out.println("\n`small += 300` IS `small = (byte)(small + 300)` - a cast you never wrote.");
    }

    /** Prints a value's 32 bits, grouped in bytes. */
    static String pad(int v) {
        String b = String.format("%32s", Integer.toBinaryString(v)).replace(' ', '0');
        return b.substring(0, 8) + " " + b.substring(8, 16) + " "
             + b.substring(16, 24) + " " + b.substring(24);
    }
}
