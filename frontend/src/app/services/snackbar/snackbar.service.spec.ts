import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
    let service: SnackbarService;
    let snackBar: MatSnackBar;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule, MaterialModule, MatSnackBarModule],
            providers: [SnackbarService],
        });
        service = TestBed.inject(SnackbarService);
        snackBar = TestBed.inject(MatSnackBar);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should open the snackbar when showMessage is triggered', () => {
        const spy = spyOn(snackBar, 'open');
        service.showMessage('test');
        expect(spy).toHaveBeenCalled();
    });
});
