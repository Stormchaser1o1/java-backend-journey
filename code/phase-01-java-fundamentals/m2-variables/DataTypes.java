/**
 * The 8 primitive types in Java, with the sizes and ranges the JVM
 * actually reports at runtime. Nothing here is memorised from a book —
 * every number is printed by the JVM itself.
 */
public class DataTypes {
    public static void main(String[] args) {

        // ---- Whole numbers (integer types) ----
        byte  b = 100;             // 8 bits
        short s = 30000;           // 16 bits
        int   i = 2000000000;      // 32 bits  <- the default for whole numbers
        long  l = 9000000000L;     // 64 bits  <- the L suffix is REQUIRED here

        // ---- Numbers with a decimal point (floating-point types) ----
        float  f = 3.14f;                 // 32 bits <- the f suffix is REQUIRED
        double d = 3.141592653589793;     // 64 bits <- the default for decimals

        // ---- A single character, and a true/false flag ----
        char    c = 'A';           // 16 bits, SINGLE quotes
        boolean flag = true;       // true or false only

        System.out.printf("%-9s %5s %6s  %-46s %s%n",
                "TYPE", "BITS", "BYTES", "RANGE", "MY VALUE");
        System.out.println("-".repeat(90));

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "byte", Byte.SIZE, Byte.BYTES,
                Byte.MIN_VALUE + " .. " + Byte.MAX_VALUE, b);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "short", Short.SIZE, Short.BYTES,
                Short.MIN_VALUE + " .. " + Short.MAX_VALUE, s);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "int", Integer.SIZE, Integer.BYTES,
                Integer.MIN_VALUE + " .. " + Integer.MAX_VALUE, i);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "long", Long.SIZE, Long.BYTES,
                Long.MIN_VALUE + " .. " + Long.MAX_VALUE, l);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "float", Float.SIZE, Float.BYTES,
                "~7 decimal digits of precision", f);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "double", Double.SIZE, Double.BYTES,
                "~15 decimal digits of precision", d);

        System.out.printf("%-9s %5d %6d  %-46s %s%n", "char", Character.SIZE, Character.BYTES,
                "0 .. " + (int) Character.MAX_VALUE + " (a Unicode code unit)", c);

        System.out.printf("%-9s %5s %6s  %-46s %s%n", "boolean", "1*", "1*",
                "true or false", flag);

        System.out.println("\n* boolean has no guaranteed size - the JVM decides.");
    }
}
