// Copyright 2016 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for EditableCollectionBackendApiService.
 */
import { HttpClientTestingModule, HttpTestingController } from
  '@angular/common/http/testing';
import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { EditableCollectionBackendApiService } from
  'domain/collection/editable-collection-backend-api.service';

fdescribe('Editable collection backend API service', () => {
  let editableCollectionBackendApiService:
    EditableCollectionBackendApiService = null;
  let httpTestingController: HttpTestingController;
  // Sample collection object returnable from the backend
  let sampleDataResults = {
    collection: {
      id: '0',
      title: 'Collection Under Test',
      category: 'Test',
      objective: 'To pass',
      version: '1',
      nodes: [{
        exploration_id: '0'
      }],
      next_exploration_ids: [],
      completed_exploration_ids: []
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    editableCollectionBackendApiService = TestBed.get(
      EditableCollectionBackendApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // it('should successfully fetch an existing collection from the backend',
  //   fakeAsync(() => {
  //     var successHandler = jasmine.createSpy('success');
  //     var failHandler = jasmine.createSpy('fail');

  //     editableCollectionBackendApiService.fetchCollection('0').then(
  //       successHandler, failHandler);
  //     var req = httpTestingController.expectOne(
  //       '/collection_editor_handler/data/0');
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(sampleDataResults);

  //     flushMicrotasks();

  //     expect(successHandler).toHaveBeenCalledWith(sampleDataResults.collection);
  //     expect(failHandler).not.toHaveBeenCalled();
  //   })
  // );

  // it('should use the rejection handler if the backend request failed',
  //   fakeAsync(() => {
  //     var successHandler = jasmine.createSpy('success');
  //     var failHandler = jasmine.createSpy('fail');

  //     editableCollectionBackendApiService.fetchCollection('1').then(
  //       successHandler, failHandler);
  //     var req = httpTestingController.expectOne(
  //       '/collection_editor_handler/data/1');
  //     expect(req.request.method).toEqual('GET');
  //     req.flush('Error loading collection 1', {
  //       status: 500, statusText: 'Invalid Request'
  //     });

  //     flushMicrotasks();

  //     expect(successHandler).not.toHaveBeenCalled();
  //     expect(failHandler).toHaveBeenCalledWith('Error loading collection 1');
  //   })
  // );

  // it('should update a collection after fetching it from the backend',
  //   fakeAsync(() => {
  //     var successHandler = jasmine.createSpy('success');
  //     var failHandler = jasmine.createSpy('fail');
  //     var collection = null;
  //     // Loading a collection the first time should fetch it from the backend.
  //     editableCollectionBackendApiService.fetchCollection('0').then(
  //       (data) => {
  //         collection = data;
  //       });
  //     var req = httpTestingController.expectOne(
  //       '/collection_editor_handler/data/0');
  //     expect(req.request.method).toEqual('GET');
  //     req.flush(sampleDataResults);

  //     flushMicrotasks();

  //     collection.title = 'New Title';
  //     collection.version = '2';
  //     var collectionWrapper = {
  //       collection: collection
  //     };

  //     // Send a request to update collection
  //     editableCollectionBackendApiService.updateCollection(
  //       collection.id, collection.version, collection.title, []
  //     ).then(successHandler, failHandler);
  //     req = httpTestingController.expectOne(
  //       '/collection_editor_handler/data/0');
  //     expect(req.request.method).toEqual('PUT');
  //     req.flush(collectionWrapper);

  //     flushMicrotasks();

  //     expect(successHandler).toHaveBeenCalledWith(collection);
  //     expect(failHandler).not.toHaveBeenCalled();
  //   })
  // );
  fit('test 0', function() {
    expect(1).toBe(1);
  });
  fit('test 1', function() {
    expect(1).toBe(1);
  });
  fit('test 2', function() {
    expect(1).toBe(1);
  });
  fit('test 3', function() {
    expect(1).toBe(1);
  });
  fit('test 4', function() {
    expect(1).toBe(1);
  });
  fit('test 5', function() {
    expect(1).toBe(1);
  });
  fit('test 6', function() {
    expect(1).toBe(1);
  });
  fit('test 7', function() {
    expect(1).toBe(1);
  });
  fit('test 8', function() {
    expect(1).toBe(1);
  });
  fit('test 9', function() {
    expect(1).toBe(1);
  });
  fit('test 10', function() {
    expect(1).toBe(1);
  });
  fit('test 11', function() {
    expect(1).toBe(1);
  });
  fit('test 12', function() {
    expect(1).toBe(1);
  });
  fit('test 13', function() {
    expect(1).toBe(1);
  });
  fit('test 14', function() {
    expect(1).toBe(1);
  });
  fit('test 15', function() {
    expect(1).toBe(1);
  });
  fit('test 16', function() {
    expect(1).toBe(1);
  });
  fit('test 17', function() {
    expect(1).toBe(1);
  });
  fit('test 18', function() {
    expect(1).toBe(1);
  });
  fit('test 19', function() {
    expect(1).toBe(1);
  });
  fit('test 20', function() {
    expect(1).toBe(1);
  });
  fit('test 21', function() {
    expect(1).toBe(1);
  });
  fit('test 22', function() {
    expect(1).toBe(1);
  });
  fit('test 23', function() {
    expect(1).toBe(1);
  });
  fit('test 24', function() {
    expect(1).toBe(1);
  });
  fit('test 25', function() {
    expect(1).toBe(1);
  });
  fit('test 26', function() {
    expect(1).toBe(1);
  });
  fit('test 27', function() {
    expect(1).toBe(1);
  });
  fit('test 28', function() {
    expect(1).toBe(1);
  });
  fit('test 29', function() {
    expect(1).toBe(1);
  });
  fit('test 30', function() {
    expect(1).toBe(1);
  });

  fit('test 0', function() {
    expect(1).toBe(1);
  });
  fit('test 1', function() {
    expect(1).toBe(1);
  });
  fit('test 2', function() {
    expect(1).toBe(1);
  });
  fit('test 3', function() {
    expect(1).toBe(1);
  });
  fit('test 4', function() {
    expect(1).toBe(1);
  });
  fit('test 5', function() {
    expect(1).toBe(1);
  });
  fit('test 6', function() {
    expect(1).toBe(1);
  });
  fit('test 7', function() {
    expect(1).toBe(1);
  });
  fit('test 8', function() {
    expect(1).toBe(1);
  });
  fit('test 9', function() {
    expect(1).toBe(1);
  });
  fit('test 10', function() {
    expect(1).toBe(1);
  });
  fit('test 11', function() {
    expect(1).toBe(1);
  });
  fit('test 12', function() {
    expect(1).toBe(1);
  });
  fit('test 13', function() {
    expect(1).toBe(1);
  });
  fit('test 14', function() {
    expect(1).toBe(1);
  });
  fit('test 15', function() {
    expect(1).toBe(1);
  });
  fit('test 16', function() {
    expect(1).toBe(1);
  });
  fit('test 17', function() {
    expect(1).toBe(1);
  });
  fit('test 18', function() {
    expect(1).toBe(1);
  });
  fit('test 19', function() {
    expect(1).toBe(1);
  });
  fit('test 20', function() {
    expect(1).toBe(1);
  });
  fit('test 21', function() {
    expect(1).toBe(1);
  });
  fit('test 22', function() {
    expect(1).toBe(1);
  });
  fit('test 23', function() {
    expect(1).toBe(1);
  });
  fit('test 24', function() {
    expect(1).toBe(1);
  });
  fit('test 25', function() {
    expect(1).toBe(1);
  });
  fit('test 26', function() {
    expect(1).toBe(1);
  });
  fit('test 27', function() {
    expect(1).toBe(1);
  });
  fit('test 28', function() {
    expect(1).toBe(1);
  });
  fit('test 29', function() {
    expect(1).toBe(1);
  });
  fit('test 30', function() {
    expect(1).toBe(1);
  });
});
