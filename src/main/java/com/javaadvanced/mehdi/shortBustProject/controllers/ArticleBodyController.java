package com.javaadvanced.mehdi.shortBustProject.controllers;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
public class ArticleBodyController {
    
    
    @GetMapping ("/api/article/body")
    public String getArticleBody ( @RequestHeader ("Article-url") String url ) {
        
        Map< String, String > articleMap = new HashMap<>( );
        
        // Construct the complete URL using the base URL and the provided URL
        String completeUrl = "https://www.computerworld.com" + url;
        
        try {
            Document doc = Jsoup.connect( completeUrl )
                                .userAgent( "Jsoup Scraper" )
                                .timeout( 10 * 1000 )
                                .get( );
            
            Element articleContainer = doc.selectFirst( "#drr-container" );
            if ( articleContainer != null ) {
                Elements articleParagraphs = articleContainer.select( "p" );
                
                StringBuilder articleText = new StringBuilder( );
                for ( Element paragraph : articleParagraphs ) {
                    paragraph.append( "\n\n" );
                    articleText.append( paragraph.text( ) );
                    
                }
                
                articleMap.put( "body", articleText.toString( ) );
                
            }
            
        } catch ( IOException e ) {
            e.printStackTrace( );
        }
        
        return articleMap.get( "body" );
        
    }
    
}
