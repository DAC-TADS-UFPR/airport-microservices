@RestController
@RequestMapping("/clients")

public class ClientController {
    public ResponseEntity create(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
}
    public ResponseEntity update(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity delete(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity getAll() {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity getById(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.OK);
    }
    
}
