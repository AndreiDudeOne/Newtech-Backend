--- Baza de date Sakila din mysql starter server

-- 1. Selectam magazine: magazine id, adresa, oras, tara 
	SELECT store_id, address, city, country FROM store as s
		LEFT JOIN address as a on s.address_id = a.address_id
        LEFT JOIN city as c on a.city_id = c.city_id
		LEFT JOIN country as co on c.country_id = co.country_id;


-- 2. Selectam cati clienti sunt per magazin, adresa, oras, tara 
	SELECT count(customer_id) as customers_number, s.store_id, address, city, country FROM customer as c
		LEFT JOIN store as s ON c.store_id = s.store_id
        LEFT JOIN address as a on s.address_id = a.address_id
        LEFT JOIN city as ci on a.city_id = ci.city_id
		LEFT JOIN country as co on ci.country_id = co.country_id
	GROUP BY store_id
    ORDER BY count(customer_id) DESC;
    
-- 3. Selectam total de vanzari per magazin, adresa, oras, tara 
	SELECT c.store_id as p_storeId, sum(amount), address, city, country FROM payment as p
		LEFT JOIN customer as c on p.customer_id = c.customer_id
        LEFT JOIN store as s ON s.store_id = c.store_id
		LEFT JOIN address as a on s.address_id = a.address_id
        LEFT JOIN city as ci on a.city_id = ci.city_id
		LEFT JOIN country as co on ci.country_id = co.country_id
	GROUP BY p_storeId;
    

-- 	SELECT * FROM customer WHERE active = 1 LIMIT 10;-- 
--     SELECT * FROM city
--     SELECT * FROM country
 --    SELECT * from address;
--  
	