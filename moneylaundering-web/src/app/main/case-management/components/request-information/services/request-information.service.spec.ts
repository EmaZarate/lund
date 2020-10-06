import { TestBed, getTestBed } from '@angular/core/testing'; 
import { RequestInformationService } from './request-information.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';

describe('RequestInformationService', () => {
  let service: RequestInformationService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        RequestInformationService
      ]
    });
    injector = getTestBed();
    service = injector.get(RequestInformationService);
    httpMock = injector.get(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  })
  it('should be created', () => {
    const service: RequestInformationService = TestBed.get(RequestInformationService);
    expect(service).toBeTruthy();
  });

  it('should return an Observable<true>', () => {
    service.requestInformationCase(1,1,'123').subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${baseUrl}/${apiRoutes.news.base}/requestInformation`)
    expect(req.request.method).toBe("POST");
    req.flush(req);
  })
});
