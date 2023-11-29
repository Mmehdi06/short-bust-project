package com.javaadvanced.mehdi.shortBustProject.controllers;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class DataController {
    
    @GetMapping ("/api/article")
    @CrossOrigin (origins = "http://localhost:5173")
    public String getArticles ( ) {
        JSONArray articles = new JSONArray( );
        try {
            Document doc = Jsoup.connect( "https://www.computerworld.com/nl/news/" )
                                .userAgent( "Jsoup Scraper" )
                                .timeout( 10 * 1000 )
                                .get( );
            
            Elements articleTitles = doc.select( "div.article>div>h3>a" );
            Elements articleDescription = doc.select( "div.article>div>h4" );
            
            // Process each article element
            // Process each article element
            for ( Element article : articleTitles ) {
                StringBuilder articleUrl = new StringBuilder( );
                articleUrl.append( "https://www.computerworld.com" )
                          .append( article.attr( "href" ) );
                
                JSONObject articleObj = new JSONObject( );
                articleObj.put( "title", article.text( ) );
                articleObj.put( "url", articleUrl.toString( ) );
                // Get the corresponding description for the current article
                for ( int j = 0; j < articleDescription.size( ); j++ ) {
                    Element articleDescriptionEl = articleDescription.get( j );
                    Element articleTitleEl = articleDescriptionEl.previousElementSibling( );
                    if ( articleTitleEl.text( )
                                       .equals( article.text( ) ) ) {
                        articleObj.put( "description", articleDescriptionEl.text( ) );
                        break;
                    }
                }
                
                articles.add( articleObj );
            }
            
        } catch ( IOException e ) {
            e.printStackTrace( );
        }
        
        return articles.toJSONString( );
    }
    
}
