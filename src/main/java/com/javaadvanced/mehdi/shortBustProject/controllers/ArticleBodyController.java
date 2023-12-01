package com.javaadvanced.mehdi.shortBustProject.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@RestController
public class ArticleBodyController {
    
    public static void main ( String[] args ) {
        ArticleBodyController articleBodyController = new ArticleBodyController( );
        String articleBody = articleBodyController.getArticleBody(
                "/article/3711283/ouch-uk-regulators-to-investigate-apple-after-it-loses-appeal.html" );
        System.out.println( articleBody );
        
        String modifiedArticle = articleBodyController.modifyArticleBody( articleBody );
        System.out.println( modifiedArticle );
    }
    
    
    @GetMapping ("/api/article/body")
    @CrossOrigin (origins = "http://localhost:5173")
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
    
    @PostMapping ("/api/article/modify")
    public String modifyArticleBody ( @RequestBody String originalArticleBody ) {
        RestTemplate restTemplate = new RestTemplate( );
        
        // Replace 'YOUR_API_KEY' with your actual GPT-3 API key
        String apiKey = "OPEN-AI API-KEY";
        String gpt3Endpoint = "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions";
        
        HttpHeaders headers = new HttpHeaders( );
        headers.setBearerAuth( apiKey );
        headers.setContentType( MediaType.APPLICATION_JSON );
        
        String prompt = "rewrite the following article in a professional style excerpt by rewriting the content " +
                "while " + "maintaining its core " + "information. " + "Ensure the modified version is coherent," +
                "relevant, " + "and avoids any " + "additional " + "recommendations or unrelated text. " + "Retain " + "the essence of " + "the article. " + "Please generate a modified version " + "of the article body " + "that does not " + "include any post-article recommendations or social media call-to-actions. " + "Keep " + "the main focus of " + "the article but use other wording. " + "Don't make a summary, use as much text as the original article.\n\n" + originalArticleBody + "\n";
        
        Map< String, Object > requestBodyMap = new HashMap<>( );
        requestBodyMap.put( "prompt", prompt );
        requestBodyMap.put( "max_tokens", 700 );
        requestBodyMap.put( "temperature", 0.7 );
        
        ObjectMapper objectMapper = new ObjectMapper( );
        String requestBodyJson;
        try {
            requestBodyJson = objectMapper.writeValueAsString( requestBodyMap );
        } catch ( JsonProcessingException e ) {
            e.printStackTrace( );
            return originalArticleBody;
        }
        
        HttpEntity< String > requestEntity = new HttpEntity<>( requestBodyJson, headers );
        
        ResponseEntity< String > response = restTemplate.postForEntity( gpt3Endpoint, requestEntity, String.class );
        
        ObjectMapper objectMapper2 = new ObjectMapper( );
        JsonNode responseJson;
        try {
            responseJson = objectMapper2.readTree( response.getBody( ) );
        } catch ( IOException e ) {
            e.printStackTrace( );
            return originalArticleBody;
        }
        
        JsonNode choicesNode = responseJson.path( "choices" );
        if ( choicesNode.isArray( ) && choicesNode.size( ) > 0 ) {
            JsonNode textNode = choicesNode.get( 0 )
                                           .path( "text" );
            if ( textNode.isTextual( ) ) {
                String modifiedArticleBody = textNode.asText( );
                return modifiedArticleBody;
            }
        }
        
        // Handle error or return original article body in case of failure
        return originalArticleBody;
        
    }
    
}
    

