package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.locations;
import repository.LocationsRepo;

@Service
public class LocationsService {

    @Autowired
    private LocationsRepo locationsRepo;

    public List<locations> getAllLocations() {
        return locationsRepo.findAll();
    }

    public Optional<locations> getLocationById(String id) {
        return locationsRepo.findById(id);
    }

    public locations addLocation(locations location) {
        return locationsRepo.save(location);
    }

    public void deleteLocationById(String id) {
        locationsRepo.deleteById(id);
    }


    public void addInitialLocations() {
        List<locations> initialLocations = List.of(
            new locations("foodbank", "51.4531,-0.9750", "The Trussell Trust – Food Bank"),
            new locations("foodbank", "51.5484,-0.0591", "Hackney Food Bank"),
            new locations("shelter", "51.5166,-0.0711", "Crisis Skylight Centre"),
            new locations("shelter", "51.5156,-0.0676", "The Whitechapel Centre"),
            new locations("charity", "51.4970,-0.0990", "The Salvation Army"),
            new locations("charity", "51.4933,-0.0927", "London Homeless Shelter"),
            new locations("restaurant", "51.5267,-0.0754", "Dishoom Shoreditch"),
            new locations("restaurant", "51.5125,-0.1992", "The charity")
            
        );
    
        locationsRepo.saveAll(initialLocations);
    }
}