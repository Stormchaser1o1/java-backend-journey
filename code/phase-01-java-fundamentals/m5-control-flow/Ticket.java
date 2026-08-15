/**
 * Day 011 debugging exercise, solved.
 *
 * Four bugs: one compile error, three that compiled and behaved wrongly.
 *
 *   1. chain ordered widest-first  -> age 25 matched `>= 5` and became "child"
 *   2. no final else               -> `variable type might not have been initialized`
 *   3. if (isMember = true)        -> an ASSIGNMENT, always true, and it flipped isMember
 *   4. switch without break        -> priority 2 fell through and printed "normal" AND "low"
 *
 * Bug 4 is fixed here with an arrow switch EXPRESSION rather than by adding
 * `break`: fall-through becomes impossible rather than merely avoided, and the
 * compiler enforces that every path produces a value.
 */
public class Ticket {
    public static void main(String[] args) {
        int age = 25;
        String type;

        // BUG 1: tests must go narrowest -> widest, or the widest one swallows everything.
        // BUG 2: the final `else` is what guarantees `type` is always assigned.
        if (age >= 60) {
            type = "senior";
        } else if (age >= 18) {
            type = "adult";
        } else if (age >= 5) {
            type = "child";
        } else {
            type = "infant";
        }

        // BUG 3: `if (isMember = true)` assigned instead of comparing. Writing the
        // bare boolean removes the operator entirely, so `=` cannot creep back in.
        boolean isMember = false;
        if (isMember) {
            System.out.println("member discount applied");
        }

        // BUG 4: arrow form - no break to forget, no fall-through possible, and as
        // an expression it must be exhaustive or it will not compile.
        int priority = 2;
        String priorityType = switch (priority) {
            case 1 -> "urgent";
            case 2 -> "normal";
            case 3 -> "low";
            default -> "unknown";
        };

        System.out.println(priorityType);
        System.out.println("type = " + type);
    }
}
