/**
 * Day 008, Drill 2 — DELIBERATELY BROKEN. Do not "fix" this file.
 *
 * `main` is misspelled as `mainn`, so:
 *     javac Test.java   ->  succeeds silently, Test.class IS produced   (valid Java)
 *     java Test         ->  Error: Main method not found in class Test  (RUN-TIME failure)
 *
 * This is the experiment that closed the compile-time vs run-time weak area:
 * javac was perfectly happy, and only the JVM — looking for an entry point in an
 * already-loaded class — failed. Compare with Drill 1 (a missing semicolon), where
 * javac fails at the parse stage and no .class file is produced at all.
 */
public class Test{
    public static void mainn(String[] args) {
        System.out.println("Hello, World!");
    }
}
