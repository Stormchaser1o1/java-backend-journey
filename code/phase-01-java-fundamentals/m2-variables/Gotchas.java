/**
 * Four traps that catch every beginner, all of them direct consequences
 * of Day 002 (binary) — not arbitrary Java quirks.
 */
public class Gotchas {
    public static void main(String[] args) {

        System.out.println("=== 1. Integer overflow: Day 002's odometer, for real ===");
        int max = Integer.MAX_VALUE;
        System.out.println("Integer.MAX_VALUE      = " + max);
        System.out.println("Integer.MAX_VALUE + 1  = " + (max + 1));
        System.out.println("...no error. It silently wrapped to negative.\n");

        System.out.println("=== 2. Floating point cannot store 0.1 exactly ===");
        System.out.println("0.1 + 0.2        = " + (0.1 + 0.2));
        System.out.println("0.1 + 0.2 == 0.3 ? " + (0.1 + 0.2 == 0.3));
        System.out.println("This is why you NEVER use double for money.\n");

        System.out.println("=== 3. Integer division throws away the remainder ===");
        System.out.println("7 / 2    = " + (7 / 2) + "      <- not 3.5");
        System.out.println("7 / 2.0  = " + (7 / 2.0) + "    <- one decimal is enough to fix it");
        System.out.println("7 % 2    = " + (7 % 2) + "      <- % gives the remainder\n");

        System.out.println("=== 4. char is secretly a number ===");
        char letter = 'A';
        System.out.println("letter          = " + letter);
        System.out.println("(int) letter    = " + (int) letter);
        System.out.println("letter + 1      = " + (letter + 1) + "     <- became an int!");
        System.out.println("(char)(letter+1)= " + (char) (letter + 1));
        System.out.println("'a' - 'A'       = " + ('a' - 'A') + "      <- the 32 from Day 002");
    }
}
