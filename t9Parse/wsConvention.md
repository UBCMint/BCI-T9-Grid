# API Request / Response

## Predict
Convert from number sequence to potential words   

### Request
```json
{
	"Command": "Predict",
	"Message": {
		"Sequence": "1554", 
		"Depth": "0",
		"Number": "3"
	}
}
```


### Response
```json
{
	"status" : "success",
	"data" : ["book", "cool", "cook"]
}
```

