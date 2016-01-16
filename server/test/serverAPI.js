var port = 4000;

describe('homepage', function(){
  it('should respond to GET',function(done){
    superagent
      .get('http://localhost:'+ port)
      .end(function(res){
        expect(res.status).to.equal(200);
        done();
    })
  })