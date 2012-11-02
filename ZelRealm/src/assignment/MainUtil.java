package assignment;

import java.sql.Connection;
import java.util.Scanner;

public class MainUtil {

	public static void main(String[] args) {

		System.out.println("WELCOME TO MONGODB MySQL DBCONNECT\n\n");

		Scanner scan = new Scanner(System.in);

		DBService dbService = new DBService();
		dbService.createDatabase("my_users");

		System.out.println("\nSystem will now create table " + '"' + " users"
				+ '"');
		System.out.print("Please enter y to continue: ");
		String console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			String createUserTable = "CREATE TABLE users ("
					+ "user_id INT NOT NULL AUTO_INCREMENT, "
					+ "player_id VARCHAR(255),player_name VARCHAR(255), "
					+ "sessions_number INT, last_seen_date VARCHAR(255), "
					+ "CONSTRAINT pk_USERID PRIMARY KEY(user_id))";

			System.out.println("Please wait while the system is loading");
			dbService.createTable("my_users", "users", createUserTable);

		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now populate table " + '"' + "users"
				+ '"' + " with distinct player");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.populateUsersDistinctPlayer("my_users");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now update player_name in table "
				+ '"' + "users" + '"' + " ");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.updateUsersPlayerName("my_users");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now update session_numbers in table "
				+ '"' + "users" + '"' + " ");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.updateUsersSessionNumbers("my_users");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now create table " + '"'
				+ "purchases" + '"');
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			String createTablePurchases = "CREATE TABLE purchases "
					+ "(user_id INT NOT NULL, player_id VARCHAR(255), "
					+ "amount DOUBLE, number_of_purchases INT, "
					+ "FOREIGN KEY (user_id) REFERENCES users(user_id))";
			System.out.println("Please wait while the system is loading");
			dbService
					.createTable("my_users", "purchases", createTablePurchases);
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now populate table " + '"'
				+ "purchases" + '"' + " ");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.populateTablePurchases("my_users", "purchases");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out
				.println("\nSystem will now update number_of_purchases in table "
						+ '"' + "purchases" + '"' + " ");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.updateNumberOfPurchases("my_users", "purchases");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now update amount in table " + '"'
				+ "purchases" + '"' + " ");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.updateAmount("my_users", "purchases");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now print the top 10 user spenders");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.printTopTenSpenders("my_users");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

		System.out.println("\nSystem will now delete the database " + '"'
				+ "my_user" + '"');
		System.out
				.println("Deleting the database is recommended when you want to rerun the program");
		System.out.print("Please enter y to continue: ");
		console = scan.next();
		if (console.equals("y") || console.equals("Y")) {
			System.out.println("Please wait while the system is loading");
			dbService.dropSchema("my_users");
		} else {
			System.out.println("Invalid input! Program terminated");
			System.exit(0);
		}

	}

}
