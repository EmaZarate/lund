import { TestBed, getTestBed } from '@angular/core/testing';

import { DocumentAttachedService } from './document-attached.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { apiRoutes } from 'src/constants/api-routes';
import { DocumentAttached } from '../../models/document-attached.model';

fdescribe('DocumentAttachedService', () => {
  let service: DocumentAttachedService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.server.api.baseUrl}/${apiRoutes.base}`;
  beforeEach(() => { TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers:[
      DocumentAttachedService
    ]
  });
  injector = getTestBed();
  service = injector.get(DocumentAttachedService);
  httpMock = injector.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  })
  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return Observable<bool>', () => {
    
    service.delete(1).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne(`${baseUrl}/${apiRoutes.document.base}/${1}`)
    expect(req.request.method).toBe("DELETE");
    req.flush(req);
  })

  fit('should return Observable<DocummentAttached[]>', () => {
    const expectedDocumments : DocumentAttached[] = [];
    const doc1 = new DocumentAttached();
    doc1.documentId = 1;
    const doc2 = new DocumentAttached();
    doc2.documentId = 2;
    expectedDocumments.push(doc1);
    expectedDocumments.push(doc2);

    service.getDocumentsByPersonId(1).subscribe(res => {
      expect(res).toEqual(expectedDocumments);
    });
    const req = httpMock.expectOne(`${baseUrl}/${apiRoutes.document.base}/${1}`)
    expect(req.request.method).toBe("GET");
    req.flush(expectedDocumments);
  })

});
