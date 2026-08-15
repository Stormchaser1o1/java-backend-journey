/**
 * switch: the classic colon form with its fall-through trap, and the modern
 * arrow form (Java 14+) that removes it. Verified on JDK 25.
 */
public class Switching {
    public static void main(String[] args) {

        System.out.println("=== 1. Classic switch, WITHOUT break: fall-through ===");
        int day = 2;
        System.out.print("day 2 prints: ");
        switch (day) {
            case 1: System.out.print("Mon ");
            case 2: System.out.print("Tue ");   // matches here...
            case 3: System.out.print("Wed ");   // ...and keeps going!
            case 4: System.out.print("Thu ");
            default: System.out.print("(end)");
        }
        System.out.println("\nOnce a case matches, execution FALLS THROUGH every case below it.\n");

        System.out.println("=== 2. The same switch WITH break ===");
        System.out.print("day 2 prints: ");
        switch (day) {
            case 1: System.out.print("Mon"); break;
            case 2: System.out.print("Tue"); break;
            case 3: System.out.print("Wed"); break;
            default: System.out.print("other");
        }
        System.out.println("\n\n=== 3. Deliberate fall-through: grouping cases ===");
        int month = 2;
        int year = 2024;
        int days;
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31; break;
            case 4: case 6: case 9: case 11:
                days = 30; break;
            case 2:
                days = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;
                break;
            default:
                days = -1;
        }
        System.out.println("month 2 of " + year + " has " + days + " days");
        System.out.println("Stacked cases with no code between them are the ONE good use.\n");

        System.out.println("=== 4. Arrow switch (Java 14+): no break, no fall-through ===");
        System.out.print("day 2 prints: ");
        switch (day) {
            case 1 -> System.out.print("Mon");
            case 2 -> System.out.print("Tue");
            case 3 -> System.out.print("Wed");
            default -> System.out.print("other");
        }
        System.out.println("\nOnly the matching arm runs. Fall-through is impossible.\n");

        System.out.println("=== 5. switch as an EXPRESSION that returns a value ===");
        String kind = switch (day) {
            case 1, 7 -> "Weekend";
            case 2, 3, 4, 5, 6 -> "Weekday";
            default -> "Invalid";
        };
        System.out.println("day 2 is a " + kind);

        int quarter = 2;
        String label = switch (quarter) {
            case 1 -> "Jan-Mar";
            case 2 -> {
                String s = "Apr-Jun";
                yield s + " (yield returns from a block)";
            }
            default -> "unknown";
        };
        System.out.println("quarter 2 = " + label + "\n");

        System.out.println("=== 6. switch works on String too ===");
        String role = "admin";
        String access = switch (role) {
            case "admin" -> "full";
            case "editor" -> "read+write";
            case "viewer" -> "read";
            default -> "none";
        };
        System.out.println("role \"admin\" -> access " + access);
        System.out.println("(switch on String uses .equals() internally - it is safe here.)\n");

        System.out.println("=== 7. An expression switch must be EXHAUSTIVE ===");
        System.out.println("Removing `default` above is a compile error:");
        System.out.println("  error: the switch expression does not cover all possible input values");
        System.out.println("A statement switch has no such requirement - which is why a missing");
        System.out.println("case silently does nothing there, but cannot compile here.");
    }
}
