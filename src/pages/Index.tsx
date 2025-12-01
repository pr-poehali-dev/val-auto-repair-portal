import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [selectedCarType, setSelectedCarType] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const servicePrices: Record<string, Record<string, number>> = {
    diagnostics: { economy: 1500, comfort: 2000, premium: 2500 },
    engine: { economy: 15000, comfort: 25000, premium: 40000 },
    brakes: { economy: 3000, comfort: 5000, premium: 8000 },
    suspension: { economy: 5000, comfort: 8000, premium: 12000 },
    electric: { economy: 3000, comfort: 5000, premium: 7000 },
    oil: { economy: 2000, comfort: 3000, premium: 5000 },
    ac: { economy: 2500, comfort: 3500, premium: 5000 },
    parts: { economy: 0, comfort: 0, premium: 0 },
    express: { economy: 1000, comfort: 1500, premium: 2000 },
  };

  useEffect(() => {
    if (selectedService && selectedCarType) {
      const price = servicePrices[selectedService]?.[selectedCarType] || 0;
      setEstimatedPrice(price);
    } else {
      setEstimatedPrice(0);
    }
  }, [selectedService, selectedCarType]);

  useEffect(() => {
    if (mapRef.current && typeof window !== 'undefined' && (window as any).ymaps) {
      (window as any).ymaps.ready(() => {
        const map = new (window as any).ymaps.Map(mapRef.current, {
          center: [55.751244, 37.618423],
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        const placemark = new (window as any).ymaps.Placemark(
          [55.751244, 37.618423],
          {
            balloonContent: '<strong>VAL-AUTO</strong><br/>Автосервис и магазин запчастей',
          },
          {
            preset: 'islands#autoCircleIcon',
            iconColor: '#F97316',
          }
        );

        map.geoObjects.add(placemark);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-secondary/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" className="text-primary" size={32} />
              <span className="text-2xl font-heading font-bold text-secondary-foreground">VAL-AUTO</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['home', 'about', 'services', 'calculator', 'reviews', 'booking', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-secondary-foreground hover:text-primary transition-colors font-medium ${
                    activeSection === section ? 'text-primary' : ''
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О компании'}
                  {section === 'services' && 'Услуги'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'booking' && 'Запись'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button onClick={() => scrollToSection('booking')} className="hidden md:block">
              Записаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-secondary-foreground mb-6">
              Профессиональный <span className="text-primary">ремонт</span> и <span className="text-primary">запчасти</span> для вашего авто
            </h1>
            <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
              VAL-AUTO — ваш надежный партнер в обслуживании автомобилей. Качество, скорость и гарантия на все работы.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => scrollToSection('booking')} className="text-lg">
                <Icon name="Calendar" className="mr-2" size={20} />
                Записаться на ремонт
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('services')} className="text-lg bg-white">
                <Icon name="List" className="mr-2" size={20} />
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-12">О компании VAL-AUTO</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Award" className="text-primary" size={32} />
                  </div>
                  <CardTitle className="font-heading">15+ лет опыта</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наша команда профессионалов работает с автомобилями более 15 лет
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" className="text-primary" size={32} />
                  </div>
                  <CardTitle className="font-heading">5000+ клиентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Тысячи довольных клиентов доверяют нам свои автомобили
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Shield" className="text-primary" size={32} />
                  </div>
                  <CardTitle className="font-heading">Гарантия качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Предоставляем гарантию на все виды работ и запчасти
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: 'Wrench', title: 'Диагностика', desc: 'Компьютерная и визуальная диагностика всех систем' },
              { icon: 'Cog', title: 'Ремонт двигателя', desc: 'Капитальный и текущий ремонт двигателей' },
              { icon: 'CircleSlash', title: 'Тормозная система', desc: 'Замена колодок, дисков, прокачка тормозов' },
              { icon: 'Gauge', title: 'Подвеска', desc: 'Ремонт и замена элементов подвески' },
              { icon: 'Zap', title: 'Электрика', desc: 'Диагностика и ремонт электрооборудования' },
              { icon: 'Droplet', title: 'Замена масла', desc: 'Замена моторного масла и фильтров' },
              { icon: 'Wind', title: 'Кондиционер', desc: 'Заправка и ремонт климатических систем' },
              { icon: 'Package', title: 'Запчасти', desc: 'Продажа оригинальных и неоригинальных запчастей' },
              { icon: 'Clock', title: 'Экспресс-сервис', desc: 'Быстрая замена расходников без записи' },
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <Icon name={service.icon} className="text-primary mb-2" size={40} />
                  <CardTitle className="font-heading">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-4">Калькулятор стоимости</h2>
            <p className="text-center text-muted-foreground mb-12">
              Рассчитайте примерную стоимость ремонта вашего автомобиля
            </p>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Тип автомобиля</label>
                    <Select value={selectedCarType} onValueChange={setSelectedCarType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип автомобиля" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Эконом класс (Lada, Renault Logan)</SelectItem>
                        <SelectItem value="comfort">Средний класс (Hyundai, Toyota, VW)</SelectItem>
                        <SelectItem value="premium">Премиум класс (BMW, Mercedes, Audi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Услуга</label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostics">Диагностика</SelectItem>
                        <SelectItem value="engine">Ремонт двигателя</SelectItem>
                        <SelectItem value="brakes">Тормозная система</SelectItem>
                        <SelectItem value="suspension">Подвеска</SelectItem>
                        <SelectItem value="electric">Электрика</SelectItem>
                        <SelectItem value="oil">Замена масла</SelectItem>
                        <SelectItem value="ac">Кондиционер</SelectItem>
                        <SelectItem value="express">Экспресс-сервис</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {estimatedPrice > 0 && (
                    <div className="mt-6 p-6 bg-primary/10 rounded-lg border-2 border-primary animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Примерная стоимость работ:</p>
                          <p className="text-3xl font-heading font-bold text-primary">
                            от {estimatedPrice.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <Icon name="Calculator" className="text-primary" size={48} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        * Точная стоимость рассчитывается после диагностики. Цена не включает запчасти.
                      </p>
                    </div>
                  )}
                  <Button
                    onClick={() => scrollToSection('booking')}
                    className="w-full"
                    size="lg"
                    disabled={!estimatedPrice}
                  >
                    <Icon name="Calendar" className="mr-2" size={20} />
                    Записаться на эту услугу
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Александр К.',
                text: 'Отличный сервис! Быстро продиагностировали и устранили проблему. Цены адекватные, работают профессионалы.',
                rating: 5,
              },
              {
                name: 'Мария С.',
                text: 'Обращаюсь в VAL-AUTO уже 3 года. Всегда качественно, в срок и без лишних накруток. Рекомендую!',
                rating: 5,
              },
              {
                name: 'Дмитрий П.',
                text: 'Делали капитальный ремонт двигателя. Работой доволен, машина как новая. Спасибо мастерам!',
                rating: 5,
              },
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                    ))}
                  </div>
                  <CardTitle className="font-heading text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-4 text-secondary-foreground">
              Записаться на ремонт
            </h2>
            <p className="text-center text-secondary-foreground/80 mb-8">
              Оставьте заявку, и мы свяжемся с вами в ближайшее время
            </p>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input type="tel" placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Марка и модель автомобиля</label>
                    <Input placeholder="Toyota Camry" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Выберите услугу</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostics">Диагностика</SelectItem>
                        <SelectItem value="engine">Ремонт двигателя</SelectItem>
                        <SelectItem value="brakes">Тормозная система</SelectItem>
                        <SelectItem value="suspension">Подвеска</SelectItem>
                        <SelectItem value="electric">Электрика</SelectItem>
                        <SelectItem value="oil">Замена масла</SelectItem>
                        <SelectItem value="ac">Кондиционер</SelectItem>
                        <SelectItem value="parts">Покупка запчастей</SelectItem>
                        <SelectItem value="express">Экспресс-сервис</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Предпочитаемая дата</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Комментарий</label>
                    <Textarea placeholder="Опишите проблему или дополнительные пожелания" rows={4} />
                  </div>
                  <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      Я согласен на обработку персональных данных и принимаю условия{' '}
                      <a href="#" className="text-primary hover:underline">
                        политики конфиденциальности
                      </a>
                    </Label>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={!agreedToTerms}>
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Наш адрес</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-medium">Автосервис VAL-AUTO</p>
                    <p className="text-muted-foreground">г. Москва, ул. Автомобильная, д. 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-medium">+7 (495) 123-45-67</p>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" className="text-primary mt-1" size={24} />
                  <div>
                    <p className="font-medium">info@val-auto.ru</p>
                    <p className="text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Режим работы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Понедельник - Пятница</span>
                  <span className="text-muted-foreground">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Суббота</span>
                  <span className="text-muted-foreground">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Воскресенье</span>
                  <span className="text-muted-foreground">10:00 - 18:00</span>
                </div>
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-center">
                    <Icon name="Clock" className="inline mr-2" size={16} />
                    Экспресс-сервис работает без выходных
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Как нас найти</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={mapRef} style={{ width: '100%', height: '400px' }} className="rounded-lg overflow-hidden"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Wrench" className="text-primary" size={28} />
            <span className="text-2xl font-heading font-bold">VAL-AUTO</span>
          </div>
          <p className="text-secondary-foreground/70 mb-4">
            Профессиональный ремонт автомобилей и продажа запчастей
          </p>
          <p className="text-sm text-secondary-foreground/50">
            © 2024 VAL-AUTO. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;