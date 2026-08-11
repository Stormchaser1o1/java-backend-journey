/**
 * Widening vs narrowing, and the promotion rules that surprise people.
 * Every value is printed by the JVM.
 */
public class Conversion {
    public static void main(String[] args) {

        System.out.println("=== 1. WIDENING is automatic (no cast needed) ===");
        byte b = 42;
        int i = b;          // byte -> int, safe, implicit
        long l = i;         // int -> long
        double d = l;       // long -> double
        System.out.println("byte 42 -> int " + i + " -> long " + l + " -> double " + d);
        System.out.println("Nothing is lost going UP the ladder.\n");

        System.out.println("=== 2. NARROWING needs an explicit cast ===");
        double price = 99.99;
        // int rupees = price;          // won't compile
        int rupees = (int) price;
        System.out.println("(int) 99.99  = " + rupees + "   <- TRUNCATES, does not round");
        System.out.println("(int) -99.99 = " + (int) -99.99 + "  <- toward zero, not down");
        System.out.println("Math.round(99.99) = " + Math.round(99.99) + "  <- use this to round\n");

        System.out.println("=== 3. The cast is a PROMISE, not a fix ===");
        int big = 300;
        System.out.println("(byte) 300   = " + (byte) big + "   <- kept only the low 8 bits");
        System.out.println("(byte) 130   = " + (byte) 130 + "  <- overflowed past 127");
        System.out.println("(char) 65    = " + (char) 65 + "     <- int back to char\n");

        System.out.println("=== 4. Small types are PROMOTED to int in expressions ===");
        byte x = 10, y = 20;
        // byte sum = x + y;            // won't compile: x + y is an int!
        byte sum = (byte) (x + y);
        System.out.println("byte + byte gives an int; assigning back needs a cast: " + sum);
        char c = 'A';
        System.out.println("'A' + 1 has type int -> " + ('A' + 1)
                + ", cast back: " + (char) ('A' + 1) + "\n");

        System.out.println("=== 5. Literals: the compiler helps when it CAN see the value ===");
        byte ok = 100;              // fine: 100 is a compile-time constant that fits
        // byte no = 200;           // won't compile: 200 does not fit
        final int constant = 100;
        byte alsoOk = constant;     // fine: final, known at compile time
        int variable = 100;
        byte needsCast = (byte) variable;   // NOT fine without a cast: value unknown at compile time
        System.out.println("byte ok = 100 (literal) -> " + ok);
        System.out.println("byte from final int     -> " + alsoOk);
        System.out.println("byte from plain int     -> " + needsCast + "  (cast was required)\n");

        System.out.println("=== 6. Widening can STILL lose precision ===");
        int precise = 16777217;             // 2^24 + 1
        float f = precise;                  // int -> float is WIDENING, no cast needed
        System.out.println("int   16777217 -> float " + f + "   <- lost the +1!");
        System.out.println("back to int    -> " + (int) f);
        long bigLong = 123456789123456789L;
        System.out.println("long  " + bigLong + " -> double " + (double) bigLong);
        System.out.println("float/double have limited PRECISION, not just range.\n");

        System.out.println("=== 7. Casting a huge/NaN double to int ===");
        System.out.println("(int) 1e20        = " + (int) 1e20 + "   <- clamped to Integer.MAX_VALUE");
        System.out.println("(int) -1e20       = " + (int) -1e20 + "  <- clamped to Integer.MIN_VALUE");
        System.out.println("(int) Double.NaN  = " + (int) Double.NaN + "            <- NaN becomes 0");
        System.out.println("Unlike int overflow, double->int SATURATES instead of wrapping.\n");

        System.out.println("=== 8. Text is not a number ===");
        String s = "123";
        int parsed = Integer.parseInt(s);
        System.out.println("Integer.parseInt(\"123\") + 1 = " + (parsed + 1));
        System.out.println("\"123\" + 1 (String concat)   = " + (s + 1) + "   <- NOT arithmetic");
        System.out.println("String.valueOf(456)         = " + String.valueOf(456));
        try {
            Integer.parseInt("12a");
        } catch (NumberFormatException e) {
            System.out.println("Integer.parseInt(\"12a\")     -> " + e);
        }
    }
}
