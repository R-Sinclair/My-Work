package RestController;

import Tables.locations;
import services.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationsController {

    @Autowired
    private LocationsService locationsService;

    @GetMapping("/all")
    public List<locations> getAllLocations() {
        return locationsService.getAllLocations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<locations> getLocationById(@PathVariable String id) {
        return locationsService.getLocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public locations addLocation(@RequestBody locations location) {
        return locationsService.addLocation(location);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLocationById(@PathVariable String id) {
        locationsService.deleteLocationById(id);
        return ResponseEntity.ok().build();
    }

    
}