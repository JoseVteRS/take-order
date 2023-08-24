import Link from "next/link";


const links = [
  {
    label: 'Restaurant',
    href: '/admin/restaurant'
  }
]

export default function AdminPage() {
  return (
    <div>
      <h1>Hello Page Admin</h1>
      <div>
        <ul>
          {
            links.map((link) => (
              <li>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}