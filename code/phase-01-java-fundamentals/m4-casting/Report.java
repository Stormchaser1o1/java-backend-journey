/**
 * Day 010 debugging exercise, solved.
 *
 * Four bugs: two were compile errors, two compiled fine and printed silently
 * wrong numbers. One line (the Math.round cast) was already correct.
 *
 * The lesson that took the longest to land is the placement of the cast:
 *
 *   WIDENING  (up the ladder)   -> cast an OPERAND, before the maths runs.
 *       (long) totalViews + newViews          the addition itself is what overflows
 *       (long)(totalViews + newViews)   WRONG - converts an already-wrong number
 *
 *   NARROWING (down the ladder) -> do the maths first, THEN shrink.
 *       (byte)(level + 1)                     nothing is lost during the addition
 *       (byte) level + 1                WRONG - a cast binds tighter than +, so this
 *                                       is ((byte) level) + 1, an int again
 *
 * One sentence covering both: put the cast wherever it PREVENTS the loss.
 */
public class Report {
    public static void main(String[] args) {
        int totalViews = 2100000000;
        int newViews   = 300000000;

        // BUG 1 (silently wrong): `totalViews + newViews` overflowed as int before
        // the widening. Cast one operand so the addition happens in 64 bits.
        long allViews = (long) totalViews + newViews;

        // BUG 2 (silently wrong): 45 / 60 was integer division -> 0, so the whole
        // expression was 0.0. Cast one operand so the division happens in double.
        double scorePercent = (double) 45 / 60 * 100;

        byte level = 5;
        // BUG 3 (compile error): `level + 1` is promoted to int. Brackets first,
        // then narrow. `(byte) level + 1` would still be an int.
        byte nextLevel = (byte) (level + 1);

        // NOT A BUG: Math.round(double) returns a long, so this cast is required.
        double rating = 4.7;
        int stars = (int) Math.round(rating);
        System.out.println("stars = " + stars);

        // BUG 4 (compile error): String is not on the numeric ladder - no cast
        // crosses it. Parse instead.
        String countText = "42";
        int count = Integer.parseInt(countText);

        System.out.println(allViews + " " + scorePercent + " " + nextLevel + " " + count);
    }
}
