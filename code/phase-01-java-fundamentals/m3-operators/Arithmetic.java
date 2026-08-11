/**
 * Arithmetic operators, and the four places they surprise people.
 * Every number below is printed by the JVM, not copied from a book.
 */
public class Arithmetic {
    public static void main(String[] args) {

        System.out.println("=== 1. The five arithmetic operators ===");
        int a = 17, b = 5;
        System.out.println("a + b  = " + (a + b));
        System.out.println("a - b  = " + (a - b));
        System.out.println("a * b  = " + (a * b));
        System.out.println("a / b  = " + (a / b) + "   <- int / int is ALWAYS an int");
        System.out.println("a % b  = " + (a % b) + "   <- remainder\n");

        System.out.println("=== 2. Division and remainder with NEGATIVES ===");
        System.out.println("-7 / 2  = " + (-7 / 2) + "    <- truncates TOWARD ZERO, not down");
        System.out.println("-7 % 2  = " + (-7 % 2) + "    <- sign follows the LEFT operand");
        System.out.println(" 7 % -2 = " + (7 % -2) + "     <- still positive: left operand is +\n");

        System.out.println("=== 3. Dividing by zero: it depends on the type ===");
        System.out.println("7.0 / 0 = " + (7.0 / 0) + "   <- double: Infinity, no crash");
        System.out.println("0.0 / 0 = " + (0.0 / 0) + "        <- double: NaN, no crash");
        try {
            int boom = 7 / 0;                       // compiles fine!
            System.out.println(boom);
        } catch (ArithmeticException e) {
            System.out.println("7 / 0   = " + e + "   <- int: RUN-TIME exception");
        }
        System.out.println("Note: `int x = 7 / 0;` COMPILES. It only fails when it runs.\n");

        System.out.println("=== 4. ++ and -- : where you put it matters ===");
        int i = 5;
        System.out.println("i        = " + i);
        System.out.println("i++      = " + (i++) + "     <- POST: use the old value, THEN add");
        System.out.println("i is now = " + i);
        int j = 5;
        System.out.println("++j      = " + (++j) + "     <- PRE: add first, THEN use");
        System.out.println("j is now = " + j + "\n");

        System.out.println("=== 5. Precedence: * and / before + and - ===");
        System.out.println("2 + 3 * 4     = " + (2 + 3 * 4) + "    <- not 20");
        System.out.println("(2 + 3) * 4   = " + ((2 + 3) * 4) + "    <- brackets win");
        System.out.println("10 - 4 - 3    = " + (10 - 4 - 3) + "     <- left to right");

        System.out.println("\n=== 6. Overflow happens mid-expression too ===");
        int big = 100000;
        System.out.println("100000 * 100000 as int  = " + (big * big) + "  <- WRONG, overflowed");
        System.out.println("100000L * 100000 as long = " + (100000L * big) + "   <- correct");
    }
}
