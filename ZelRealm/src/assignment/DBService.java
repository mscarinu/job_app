package assignment;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MapReduceOutput;

public class DBService {

	static Connection conn = null;
	static String url = "jdbc:mysql://localhost:3306/";
	static String driver = "com.mysql.jdbc.Driver";
	static String userName = "root";
	static String password = "root";

	// DROP my_users SCHEMA
	public static void dropSchema(String dbName) {

		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			String dropDatabase = "DROP DATABASE my_users";
			PreparedStatement ps = conn.prepareStatement(dropDatabase);
			int val = ps.executeUpdate(dropDatabase);
			System.out.println("DELETE DATABASE " + '"' + dbName + '"');
			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// CREATE DATABASE my_users
	public static void createDatabase(String dbName) {
		System.out.println("CREATING DATABASE " + dbName);
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager.getConnection(url + "", userName, password);

			String createDatabase = "CREATE DATABASE " + dbName;
			PreparedStatement st = conn.prepareStatement(createDatabase);
			int val = st.executeUpdate();
			if (val == 1) {
				System.out.println("Database " + dbName + " created");
				System.out.println("Please check database");
			}
			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// CREATE TABLE users
	public static void createTable(String dbName, String tableName, String query) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			PreparedStatement ps = conn.prepareStatement(query);
			ps.execute();
			System.out.println("Table " + tableName + " created");
			System.out.println("Please check database");

			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// POPULATE TABLE users with distinct player_id
	public static void populateUsersDistinctPlayer(String dbName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			MongoDBCollection m = new MongoDBCollection();
			Set distinctUser = m.getDistinctUser();

			Iterator it = distinctUser.iterator();
			ResultSet rs;
			int count = 0;

			while (it.hasNext()) {
				String str = (String) it.next();
				String populateUser = "INSERT INTO users " + "(player_id)"
						+ " VALUES(" + '"' + str + '"' + ")";
				PreparedStatement ps = conn.prepareStatement(populateUser);
				ps.executeUpdate();
				count++;
			}

			System.out.println("\n" + count + " rows affected");
			System.out.println("Please check database");

			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// UPDATE TABLE users with player_name
	public static void updateUsersPlayerName(String dbName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			MongoDBCollection m = new MongoDBCollection();
			MapReduceOutput map = m.getSessionCount();

			for (DBObject object : map.results()) {
				DBObject keySet = (DBObject) object.get("_id");
				String playerId = (String) keySet.get("player_id");
				String playerName = (String) keySet.get("player_name");

				String updatePlayerName = "UPDATE users SET player_name=" + '"'
						+ playerName + '"' + " WHERE player_id =" + '"'
						+ playerId + '"';
				PreparedStatement ps = conn.prepareStatement(updatePlayerName);
				ps.executeUpdate();
				System.out.println("player_id: " + playerId + " "
						+ "player_name: " + playerName);

			}

			System.out.println("Table users updated");
			System.out.println("Please check database");
			conn.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// UPDATE TABLE users with session_numbers
	public static void updateUsersSessionNumbers(String dbName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			MongoDBCollection m = new MongoDBCollection();
			MapReduceOutput out = m.getSessionCount();

			for (DBObject object : out.results()) {
				DBObject keySet = (DBObject) object.get("_id");
				String playerid = (String) keySet.get("player_id");
				DBObject dbo = (DBObject) object.get("value");
				Double sessionNumber = (Double) dbo.get("count");
				Integer sn = sessionNumber.intValue();
				String updateSql = "UPDATE users SET sessions_number=" + '"'
						+ sn + '"' + " WHERE player_id =" + '"' + playerid
						+ '"';
				PreparedStatement ps = conn.prepareStatement(updateSql);
				ps.executeUpdate();
			}

			conn.close();
			System.out.println("Table users updated");
			System.out.println("Please check database");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// POPULATE TABLE purchases with user_id and player_id
	public static void populateTablePurchases(String dbName, String tableName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			String queryUsers = "SELECT user_id, player_id FROM users";
			PreparedStatement pstmt = conn.prepareStatement(queryUsers);
			ResultSet rs = pstmt.executeQuery();

			while (rs.next()) {
				String uid = rs.getString("user_id");
				String pid = rs.getString("player_id");
				String insertSql = "INSERT INTO purchases "
						+ "(user_id, player_id)" + " VALUES(" + '"' + uid + '"'
						+ ", " + '"' + pid + '"' + ")";
				System.out.println("user_id: " + uid + " player_id: " + pid);
				PreparedStatement ps = conn.prepareStatement(insertSql);
				ps.executeUpdate();
			}

			conn.close();
			System.out.println("Table " + tableName + " updated");
			System.out.println("Please check database");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// UPDATE TABLE purchases with number_of_purchases
	public static void updateNumberOfPurchases(String dbName, String tableName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			MongoDBCollection m = new MongoDBCollection();
			MapReduceOutput out = m.getPurchaseCountAndAmount();

			for (DBObject object : out.results()) {
				String playerid = (String) object.get("_id");
				DBObject o = (DBObject) object.get("value");
				Integer count = ((Double) o.get("count")).intValue();
				System.out.println("player_id: " + playerid
						+ " number of purchases: " + count);

				String updateSql = "UPDATE purchases SET number_of_purchases = "
						+ '"'
						+ count
						+ '"'
						+ " WHERE player_id ="
						+ '"'
						+ playerid + '"';
				PreparedStatement ps = conn.prepareStatement(updateSql);
				ps.executeUpdate();

			}
			conn.close();
			System.out.println("Table " + tableName + " updated");
			System.out.println("Please check database");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// UPDATE TABLE purchases with amount
	public static void updateAmount(String dbName, String tableName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			MongoDBCollection m = new MongoDBCollection();
			MapReduceOutput out = m.getPurchaseCountAndAmount();

			for (DBObject object : out.results()) {
				String playerid = (String) object.get("_id");
				DBObject o = (DBObject) object.get("value");
				Double amount = (Double) o.get("sum");
				System.out.println("player_id: " + playerid + " amount: "
						+ amount);

				String updateSql = "UPDATE purchases SET amount = " + '"'
						+ amount + '"' + " WHERE player_id =" + '"' + playerid
						+ '"';
				PreparedStatement ps = conn.prepareStatement(updateSql);
				ps.executeUpdate();

			}

			removePlayerId();

			conn.close();
			System.out.println("Table " + tableName + " updated");
			System.out.println("Please check database");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// Remove column player_id in purchases table
	public static void removePlayerId() {
		try {
			String dbName = "my_users";
			String tableName = "purchases";
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			String updateSql = "ALTER TABLE " + tableName + " DROP player_id;";
			PreparedStatement ps = conn.prepareStatement(updateSql);
			ps.executeUpdate();

			conn.close();
			System.out.println("Table " + tableName + " updated");
			System.out.println("Please check database");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// PRINTING TOP 10 SPENDERS
	public static void printTopTenSpenders(String dbName) {
		try {
			Class.forName(driver).newInstance();
			conn = DriverManager
					.getConnection(url + dbName, userName, password);

			String updateSql = "";
			Statement st = conn.createStatement();

			updateSql = "SELECT u.player_name AS player_name, p.amount AS amount, p.number_of_purchases AS number_of_purchases,"
					+ "(p.amount/p.number_of_purchases) AS avg_amount_per_purchase,"
					+ " u.last_seen_date AS last_seen_date FROM purchases p"
					+ " LEFT JOIN users u"
					+ " ON u.user_id = p.user_id"
					+ " ORDER BY amount DESC" + " LIMIT 10";

			System.out.println("\nPRINTING TOP 10 SPENDERS\n");
			ResultSet rs = st.executeQuery(updateSql);

			System.out
					.println("PLAYER NAME  |AMOUNT    |AVG AMOUNT PER PURCHASE");

			while (rs.next()) {
				System.out.print(rs.getString("player_name") + "  |");
				System.out.print(rs.getString("amount") + "  | ");
				System.out.print(rs.getString("avg_amount_per_purchase"));
				System.out.println();
			}
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		DBService dbservice = new DBService();
		dbservice.updateUsersSessionNumbers("my_users");
	}
}
