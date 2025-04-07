package Config;

import io.jsonwebtoken.Claims;

@FunctionalInterface
public interface ClaimsResolver<T> {
    T resolve(Claims claims);
}
