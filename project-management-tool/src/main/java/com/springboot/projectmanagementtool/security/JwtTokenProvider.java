package com.springboot.projectmanagementtool.security;

import com.springboot.projectmanagementtool.domain.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.springboot.projectmanagementtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.springboot.projectmanagementtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Date currentDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(currentDate.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(currentDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException signatureException) {
            System.out.println("Invalid JWT Signature");
        } catch (MalformedJwtException malformedJwtException) {
            System.out.println("Invalid JWT Token");
        } catch (ExpiredJwtException expiredJwtException) {
            System.out.println("Expired JWT Token");
        } catch (UnsupportedJwtException unsupportedJwtException) {
            System.out.println("Unsupported JWT Token");
        } catch (IllegalArgumentException illegalArgumentException) {
            System.out.println("JWT claims string is empty");
        }

        return false;
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String userId = (String) claims.get("id");
        return Long.parseLong(userId);
    }
}