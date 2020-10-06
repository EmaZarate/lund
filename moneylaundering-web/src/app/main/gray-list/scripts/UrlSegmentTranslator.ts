export class UrlTranslator {

    convert(value: string) {
        switch(value) {
            case 'detail' : return 'Detalle';
            case 'edit' : return 'Edición';
            case 'new' : return 'Nuevo'
            default: return '';
        }
    }
}