
export class Bucket {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public createdAt: string,
    public updatedAt: string,
    public Links: Array<Link>
  ) {}
}

interface ILink {
  _createdAt?: string,
  _updatedAt: string,
}

export class Link implements ILink {

  public _createdAt;
  public _updatedAt;

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public url: string,
    public createdAt: string | any,
    public updatedAt: string | any,
    public BucketId: number,
    public dateHasBeenFormated: boolean = false
  ) {}

  setCreated(date: string): void {
    this._createdAt = date;
  }

  setUpdated(date: string): void {
    this._updatedAt = date;
  }

  
}