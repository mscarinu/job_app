package assignment;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.types.ObjectId;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MapReduceCommand;
import com.mongodb.MapReduceOutput;
import com.mongodb.Mongo;
import com.mongodb.ReadPreference;

public class MongoDBCollection {

	Mongo m = null;
	static DB db;

	public MongoDBCollection() {
		try {
			m = new Mongo("23.21.147.254", 27017);
			db = m.getDB("job_application");
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

	// get distinct users from payment and session collection
	public static Set getDistinctUser() {

		DBCollection col = db.getCollection("session");
		List distinctUserSession = col.distinct("player_id");

		DBCollection col1 = db.getCollection("payment");
		List distinctUserPayment = col1.distinct("player_id");

		Set distinctUser = new HashSet<String>();
		distinctUser.addAll(distinctUserSession);
		distinctUser.addAll(distinctUserPayment);

		return distinctUser;

	}

	// count number of session per user
	public static MapReduceOutput getSessionCount() {
		DBCollection col = db.getCollection("session");

		String map = "function(){"
				+ "emit("
				+ "{player_id: this.player_id, player_name: this.player_name}, {count: 1});"
				+ "};";

		System.out.println(map);
		String reduce = "function( key , values ){" + "var n = {count: 0}; "
				+ "for ( var i = 0; i < values.length; i ++ ) {"
				+ "n.count += values[i].count;" + "};" + "return n;" + "};";
		System.out.println(reduce);

		MapReduceOutput out = col.mapReduce(map, reduce, null,
				MapReduceCommand.OutputType.INLINE, null);

		return out;
	}

	public static Map getLastSession() {

		DBCollection col = db.getCollection("session");

		String map = "function(){" + 
				"emit(" + 
					"this.player_id, {date: date});" +
				"};";
		String reduce = "function( obj , prev ){" +
					"if(prev.maxdate , obj.timestamp) {" +
						" prev.maxdate = obj.timestamp;" + 
					" }" + 
					"return n;" + 
				"};";

		MapReduceOutput out = col.mapReduce(map, reduce, null,
				MapReduceCommand.OutputType.INLINE, null);

		for (DBObject object : out.results()) {
			System.out.println(object);
		}

		return null;
	}

	// retrieve number of purchase and amount spent per user
	public static MapReduceOutput getPurchaseCountAndAmount() {
		DBCollection col = db.getCollection("payment");

		String map = "function(){" + 
				"emit(" +
					"this.player_id, {count: 1, sum:this.amount});" + 
				"};";
		String reduce = "function( key , values ){" +
					"var n = {count: 0, sum:0}; " +
						"for ( var i = 0; i < values.length; i ++ ) {" +
							"n.sum += values[i].sum;" + 
							"n.count += values[i].count;" +
						"};" + 
						"return n;" + 
					"};";

		MapReduceOutput out = col.mapReduce(map, reduce, null,
				MapReduceCommand.OutputType.INLINE, null);

		return out;

	}

	// retrieve player name from session collection
	public static DBCursor getPlayerName() {

		DBCollection col = db.getCollection("session");
		DBCursor cursor = col.find();

		return cursor;
	}

}
