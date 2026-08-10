/**
 * Day 006's FindLargest pseudocode, now as real Java.
 * The pseudocode is unchanged — only the syntax is different.
 *
 *   ALGORITHM FindLargest(a, b, c)      ->   int a = 7, b = 2, c = 9;
 *       largest <- a                    ->   int largest = a;
 *       IF b > largest THEN             ->   if (b > largest) {
 *           largest <- b                ->       largest = b;
 *       END IF                          ->   }
 *       RETURN largest                  ->   System.out.println(largest);
 *
 * (The `if` statement itself is taught properly in Module 5. It is here only
 *  to show that Day 006's pseudocode maps to Java almost line for line.)
 */
public class FindLargest {
    public static void main(String[] args) {

        int a = 7;
        int b = 2;
        int c = 9;

        int largest = a;          // declaration + initialisation, "assume a wins"

        if (b > largest) {
            largest = b;          // assignment only — `int` is NOT repeated
        }

        if (c > largest) {
            largest = c;
        }

        System.out.println("a = " + a + ", b = " + b + ", c = " + c);
        System.out.println("largest = " + largest);

        // The edge case you stress-tested by hand on Day 006: two values equal.
        int x = 5, y = 5, z = 3;
        int win = x;
        if (y > win) { win = y; }
        if (z > win) { win = z; }
        System.out.println("x = " + x + ", y = " + y + ", z = " + z + " -> largest = " + win);
    }
}
