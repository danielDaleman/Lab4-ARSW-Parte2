/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import java.lang.reflect.Type;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;

/**
 *
 * @author hcadavid
 */


@Service
@RestController
@RequestMapping(value = "/orders")
public class OrdersAPIController {
    
    @Autowired
    RestaurantOrderServices rs;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getOrders(){
        Gson gson = new Gson();
        Map<String, Order> map = new HashMap<>();
        Set<Integer> keys = rs.getTablesWithOrders();
        keys.forEach((i) -> {
            map.put(Integer.toString(i), rs.getTableOrder(i));
        });
            
        String mapToJson = gson.toJson(map);
        return new ResponseEntity<>(mapToJson,HttpStatus.OK);
    }
    
    
    
    //PARTE I    
    @RequestMapping(method = RequestMethod.GET, path = "/{idTable}")
    public ResponseEntity<?> getRecursoOrders(@PathVariable String idTable){
        Gson gson = new Gson();
        Map<String, Order> mapa = new HashMap<>();
        mapa.put(idTable,rs.getTableOrder(Integer.parseInt(idTable)));
        String json = gson.toJson(mapa);
        return new ResponseEntity<>(json,HttpStatus.OK);        
    }
    
    //Parte II
    @RequestMapping(method = RequestMethod.POST)	
    public ResponseEntity<?> addNewOrder(@RequestBody String o){
        try {
            Gson gson = new Gson();        
            Type list = new TypeToken<Map<String, Order>>(){}.getType();
            Map<String, Order> mapa = gson.fromJson(o,list);
            Set<String> mapaLlaves = mapa.keySet();
            for(String st : mapaLlaves){
                rs.addNewOrderToTable(mapa.get(st));
            }                
            return new ResponseEntity<>(HttpStatus.OK);

        }catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);            
        }        

    }
    
    //Parte III
    @RequestMapping(method = RequestMethod.GET, path = "/{idTable}/total")
    public ResponseEntity<?> totalOrder(@PathVariable String idTable){
        try{
            return new ResponseEntity<>("El total a pagar es : "+ rs.calculateTableBill(Integer.parseInt(idTable)),HttpStatus.OK);
        }catch(OrderServicesException ex){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.NOT_FOUND);            
        }
    }
    
    //Parte IV
    
    @RequestMapping(method = RequestMethod.PUT, path = "{idTable}")
    public ResponseEntity<?> agregarPlato(@PathVariable String idTable, @RequestBody String plato){        
        Gson gson = new Gson();
        Type t = new TypeToken<Map<String, String>>(){}.getType();
        Map<String, String> mapa = gson.fromJson(plato, t);
        
        for(String m : mapa.keySet()){            
            rs.getTableOrder(Integer.parseInt(idTable)).addDish(m, Integer.parseInt(mapa.get(m)));            
        }        
        
        return new ResponseEntity<>(HttpStatus.OK);                                                                                        
        
        
    }
    
    @RequestMapping(method = RequestMethod.DELETE, path = "{idTable}")
    public ResponseEntity<?> eliminarOrden(@PathVariable String idTable){
        try{
            rs.releaseTable(Integer.parseInt(idTable));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(OrderServicesException e){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);            
            
        }
    }
    
}
