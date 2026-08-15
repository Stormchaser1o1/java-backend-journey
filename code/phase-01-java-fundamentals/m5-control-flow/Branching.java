/**
 * if / else if / else, and the four ways branching goes wrong.
 * Day 006's pseudocode IF/ELSE, now as real Java.
 */
public class Branching {
    public static void main(String[] args) {

        System.out.println("=== 1. The basic shape ===");
        int score = 72;
        if (score >= 90) {
            System.out.println("Grade A");
        } else if (score >= 75) {
            System.out.println("Grade B");
        } else if (score >= 60) {
            System.out.println("Grade C");
        } else {
            System.out.println("Fail");
        }
        System.out.println("score 72 -> Grade C   (the FIRST true branch wins, then it stops)\n");

        System.out.println("=== 2. Order matters: the same chain, written badly ===");
        if (score >= 60) {
            System.out.println("bad chain -> Grade C");   // catches 72 first
        } else if (score >= 75) {
            System.out.println("bad chain -> Grade B");   // unreachable for 72
        }
        System.out.println("A 95 would ALSO print Grade C here. Order your tests narrowest first.\n");

        System.out.println("=== 3. The condition must be a boolean ===");
        int count = 5;
        // if (count) { }          // won't compile: int is not boolean
        if (count != 0) {
            System.out.println("count != 0 -> Java has no 'truthy'. Say what you mean.");
        }
        boolean flag = false;
        if (flag = true) {          // ⚠️ ASSIGNMENT, not comparison — compiles!
            System.out.println("if (flag = true) -> always runs, and flag is now " + flag);
        }
        System.out.println("Use == for comparison, or just `if (flag)`.\n");

        System.out.println("=== 4. Missing braces: the bug that shipped in real software ===");
        int x = 3;
        if (x > 5)
            System.out.println("   x > 5");
        System.out.println("   this line ALWAYS runs - it is not part of the if!");
        System.out.println("Without braces, an `if` owns exactly ONE statement.\n");

        System.out.println("=== 5. The dangling else ===");
        boolean loggedIn = true;
        boolean isAdmin  = false;
        if (loggedIn)
            if (isAdmin)
                System.out.println("   admin panel");
            else
                System.out.println("   NOT an admin");   // binds to the INNER if
        System.out.println("The else attached to `if (isAdmin)`, not `if (loggedIn)`.");
        System.out.println("Indentation lies; braces do not.\n");

        System.out.println("=== 6. Ternary: an expression, not a statement ===");
        int a = 7, b = 12;
        int max = (a > b) ? a : b;
        System.out.println("max of 7 and 12 = " + max);
        System.out.println("7 is " + (a % 2 == 0 ? "even" : "odd") + " - usable inside a String");
    }
}
